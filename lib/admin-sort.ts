/* Automatic numbering of the 表示順 (sort_order) column.

   The admin form lets the owner leave 表示順 blank; the create/update
   route handlers then call `nextAutoNumber()` to pick the number:

   - position "end"   → max(sort_order) + 1, i.e. appended to the list.
   - position "start" → the row takes the slot in front of the current
     first row. When 1 is already taken, the existing rows are pushed
     down by the same amount first so the new post gets 1 and the
     numbers stay positive. Shifting every row by an equal amount keeps
     the existing order intact — including rows that share a number,
     which still fall back to the published date on the public site.

   Numbering must never be the reason a save fails, so every query
   here degrades to a sane default instead of throwing. */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { ResourceConfig } from "./admin-resources";

/** Safety valve: never rewrite more rows than this in one save. */
const MAX_SHIFT_ROWS = 500;

type Row = Record<string, unknown>;

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function nextAutoNumber(
  supabase: SupabaseClient,
  cfg: ResourceConfig,
): Promise<number> {
  const auto = cfg.autoNumber;
  if (!auto) return 1;
  const { column, position } = auto;

  if (position === "end") {
    const { data, error } = await supabase
      .from(cfg.table)
      .select(column)
      .order(column, { ascending: false, nullsFirst: false })
      .limit(1);
    if (error) return 1;
    const max = toNumber((data as unknown as Row[])[0]?.[column]);
    return (max ?? 0) + 1;
  }

  // position === "start"
  const { data, error } = await supabase
    .from(cfg.table)
    .select(`id, ${column}`)
    .order(column, { ascending: true, nullsFirst: false })
    .limit(MAX_SHIFT_ROWS + 1);
  if (error || !data || data.length === 0) return 1;

  const rows = (data as unknown as Row[]).map((row) => ({
    id: row.id,
    value: toNumber(row[column]) ?? 0,
  }));
  const min = Math.min(...rows.map((r) => r.value));

  // Room in front already — no need to touch the other rows.
  if (min > 1) return min - 1;
  // Too many rows to rewrite safely; keep going above the top instead.
  if (rows.length > MAX_SHIFT_ROWS) return min - 1;

  // Push everything down so that the first free slot is 1.
  const delta = 2 - min;
  const results = await Promise.all(
    rows.map((row) =>
      supabase
        .from(cfg.table)
        .update({ [column]: row.value + delta })
        .eq("id", row.id),
    ),
  );
  // If the shift could not be applied, fall back to the slot above the
  // current top rather than colliding with the existing first row.
  if (results.some((r) => r.error)) return min - 1;
  return 1;
}
