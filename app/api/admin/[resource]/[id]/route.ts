import { NextResponse } from "next/server";
import { getResource, sanitizeBody } from "@/lib/admin-resources";
import { getServiceClient, isSupabaseWritable } from "@/lib/supabase";

/* PATCH  /api/admin/<resource>/<id> — update a row
   DELETE /api/admin/<resource>/<id> — delete a row
   Protected by middleware. */

type Ctx = { params: { resource: string; id: string } };

export async function PATCH(req: Request, { params }: Ctx) {
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
  const { data, error } = await supabase
    .from(cfg.table)
    .update(values)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const cfg = getResource(params.resource);
  if (!cfg) {
    return NextResponse.json({ error: "不明なリソースです。" }, { status: 404 });
  }
  if (!isSupabaseWritable) {
    return NextResponse.json({ error: "Supabase が未設定です。" }, { status: 503 });
  }

  const supabase = getServiceClient();
  const { error } = await supabase
    .from(cfg.table)
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
