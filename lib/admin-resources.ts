/* Whitelist of editable resources for the admin API.

   Keyed by the URL segment (/api/admin/<resource>). Only the columns
   listed in `fields` are accepted from the client, which keeps the
   generic route handlers safe from arbitrary column writes. */

export type ResourceConfig = {
  table: string;
  /** Columns the client may write (create/update). */
  fields: readonly string[];
  /** Numeric columns — coerced from strings/blanks. */
  numericFields?: readonly string[];
  /** Boolean columns — coerced from checkbox values. */
  booleanFields?: readonly string[];
  order: { column: string; ascending: boolean };
  /** Automatic numbering for the display-order column.

     When the client leaves the column blank, the API fills it in:
     - "start" → the row goes to the FRONT (blog-like content, so a
       new post shows up first without touching the older ones).
     - "end"   → the row is appended after the current last row
       (menus and other hand-curated lists). */
  autoNumber?: { column: string; position: "start" | "end" };
  /** URL-slug column (articles). Normalized on save, auto-generated
      on create when blank, and never cleared on update — so a
      published URL does not change by accident. */
  slugField?: string;
  /** Human label used in the UI. */
  label: string;
};

export const RESOURCES: Record<string, ResourceConfig> = {
  gallery: {
    table: "gallery_cases",
    fields: [
      "code",
      "title",
      "model",
      "service",
      "before_note",
      "after_note",
      "before_image_url",
      "after_image_url",
      "before_color",
      "after_color",
      "sort_order",
      "published",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "start" },
    label: "症例カルテ",
  },
  news: {
    table: "news_posts",
    fields: ["title", "slug", "body", "image_url", "published", "published_at"],
    booleanFields: ["published"],
    order: { column: "published_at", ascending: false },
    slugField: "slug",
    label: "お知らせ・更新",
  },
  "menu-body": {
    table: "body_coatings",
    fields: [
      "code",
      "class_label",
      "rank",
      "name",
      "price",
      "duration",
      "features",
      "tag",
      "sort_order",
      "published",
    ],
    numericFields: ["rank", "sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：ボディコーティング",
  },
  "menu-wash": {
    table: "wash_services",
    fields: [
      "code",
      "name",
      "subtitle",
      "description",
      "price",
      "note",
      "icon",
      "tag",
      "sort_order",
      "published",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：洗車サービス",
  },
  useful: {
    table: "useful_articles",
    fields: [
      "title",
      "slug",
      "category",
      "excerpt",
      "body",
      "image_url",
      "sort_order",
      "published",
      "published_at",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "start" },
    slugField: "slug",
    label: "お役立ち情報",
  },
  "menu-interior": {
    table: "interior_coatings",
    fields: [
      "car_type",
      "price_driver",
      "price_pair",
      "price_full",
      "sort_order",
      "published",
    ],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：内装コーティング料金表",
  },
  "menu-interior-options": {
    table: "interior_options",
    fields: ["label", "price", "note", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：内装オプション",
  },
  "menu-glass": {
    table: "glass_coatings",
    fields: ["label", "price", "note", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：ガラスコーティング",
  },
  "menu-wheel": {
    table: "wheel_coatings",
    fields: ["group_label", "label", "price", "note", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：ホイールコーティング",
  },
  "menu-b2b": {
    table: "b2b_services",
    fields: ["title", "subtitle", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：業者様向けご依頼",
  },
  "menu-brands": {
    table: "brands",
    fields: ["name", "region", "label", "sort_order", "published"],
    numericFields: ["sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "メニュー：取り扱いブランド",
  },
  testimonials: {
    table: "testimonials",
    fields: [
      "author_name",
      "car_model",
      "treatment",
      "rating",
      "title",
      "body",
      "sort_order",
      "published",
    ],
    numericFields: ["rating", "sort_order"],
    booleanFields: ["published"],
    order: { column: "sort_order", ascending: true },
    autoNumber: { column: "sort_order", position: "end" },
    label: "お客様の声",
  },
};

export function getResource(name: string): ResourceConfig | null {
  return Object.prototype.hasOwnProperty.call(RESOURCES, name)
    ? RESOURCES[name]
    : null;
}

/** Pick + coerce only the whitelisted fields from a request body. */
export function sanitizeBody(
  cfg: ResourceConfig,
  body: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of cfg.fields) {
    if (!(field in body)) continue;
    let value = body[field];

    if (cfg.numericFields?.includes(field)) {
      if (value === "" || value === null || value === undefined) {
        value = null;
      } else {
        const n = Number(value);
        value = Number.isFinite(n) ? n : null;
      }
    } else if (cfg.booleanFields?.includes(field)) {
      value = value === true || value === "true" || value === "on";
    } else if (typeof value === "string") {
      const trimmed = value.trim();
      value = trimmed === "" ? null : trimmed;
    }

    out[field] = value;
  }
  return out;
}

/* ── Auto numbering ───────────────────────────────────────────────
   The 表示順 field is optional in the admin form: when it is left
   blank the API assigns the next number itself (see lib/admin-sort). */

/** Create: a missing OR blank value means "number it for me". */
export function needsAutoNumberOnCreate(
  cfg: ResourceConfig,
  values: Record<string, unknown>,
): boolean {
  const column = cfg.autoNumber?.column;
  if (!column) return false;
  return values[column] == null;
}

/** Update: only a value the editor explicitly cleared is re-numbered —
    a column that was not sent at all must stay untouched. */
export function needsAutoNumberOnUpdate(
  cfg: ResourceConfig,
  values: Record<string, unknown>,
): boolean {
  const column = cfg.autoNumber?.column;
  if (!column) return false;
  return column in values && values[column] == null;
}

/* ── URL slugs ────────────────────────────────────────────────────
   Articles live at /news/<slug> and /useful/<slug>. */

/** Lower-case a-z / 0-9 / single hyphens. Empty → null. */
export function normalizeSlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const slug = value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug === "" ? null : slug;
}

/** Fallback slug: publish date (Japan time) + 8 random hex chars,
    e.g. 20261002-1a2b3c4d. */
function generateSlug(publishedAt: unknown): string {
  const d = new Date(typeof publishedAt === "string" ? publishedAt : Date.now());
  const date = Number.isNaN(d.getTime()) ? new Date() : d;
  const ymd = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  })
    .format(date)
    .replace(/-/g, "");
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  return `${ymd}-${rand}`;
}

/** Normalize / fill the slug column in place before a write. */
export function prepareSlug(
  cfg: ResourceConfig,
  values: Record<string, unknown>,
  mode: "create" | "update",
): void {
  const column = cfg.slugField;
  if (!column) return;

  if (mode === "update" && !(column in values)) return;
  const slug = normalizeSlug(values[column]);

  if (slug) {
    values[column] = slug;
  } else if (mode === "create") {
    values[column] = generateSlug(values.published_at);
  } else {
    // Cleared on edit: keep the current URL instead of breaking links.
    delete values[column];
  }
}

/** Friendlier message for a duplicate slug (unique violation). */
export function writeErrorMessage(error: { code?: string; message: string }): string {
  if (error.code === "23505") {
    return "このURL（スラッグ）は既に使われています。別の文字列を入力してください。";
  }
  return error.message;
}
