import { NextResponse } from "next/server";
import {
  getResource,
  needsAutoNumberOnCreate,
  sanitizeBody,
} from "@/lib/admin-resources";
import { nextAutoNumber } from "@/lib/admin-sort";
import { getServiceClient, isSupabaseWritable } from "@/lib/supabase";

/* GET  /api/admin/<resource>  — list ALL rows (incl. unpublished)
   POST /api/admin/<resource>  — create a row
   Protected by middleware. Writes use the service-role client. */

type Ctx = { params: { resource: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const cfg = getResource(params.resource);
  if (!cfg) {
    return NextResponse.json({ error: "不明なリソースです。" }, { status: 404 });
  }
  if (!isSupabaseWritable) {
    return NextResponse.json({ error: "Supabase が未設定です。" }, { status: 503 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from(cfg.table)
    .select("*")
    .order(cfg.order.column, { ascending: cfg.order.ascending });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function POST(req: Request, { params }: Ctx) {
  const cfg = getResource(params.resource);
  if (!cfg) {
    return NextResponse.json({ error: "不明なリソースです。" }, { status: 404 });
  }
  if (!isSupabaseWritable) {
    return NextResponse.json({ error: "Supabase が未設定です。" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  const values = sanitizeBody(cfg, body);
  const supabase = getServiceClient();

  // 表示順が空欄なら自動採番（ブログ系は先頭、メニュー系は末尾）。
  if (needsAutoNumberOnCreate(cfg, values)) {
    values[cfg.autoNumber!.column] = await nextAutoNumber(supabase, cfg);
  }

  const { data, error } = await supabase
    .from(cfg.table)
    .insert(values)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data }, { status: 201 });
}
