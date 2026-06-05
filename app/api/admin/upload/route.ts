import { NextResponse } from "next/server";
import {
  getServiceClient,
  isSupabaseWritable,
  MEDIA_BUCKET,
} from "@/lib/supabase";

/* POST /api/admin/upload — multipart form with a single `file`.
   Stores it in the public `media` bucket and returns its public URL.
   Protected by middleware. */

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

function extFor(type: string): string {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/avif":
      return "avif";
    default:
      return "bin";
  }
}

export async function POST(req: Request) {
  if (!isSupabaseWritable) {
    return NextResponse.json({ error: "Supabase が未設定です。" }, { status: 503 });
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "ファイルがありません。" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "JPEG / PNG / WebP / AVIF のみアップロードできます。" },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "ファイルサイズは10MBまでです。" },
      { status: 400 },
    );
  }

  const supabase = getServiceClient();
  const name = `${Date.now()}-${crypto.randomUUID()}.${extFor(file.type)}`;
  const path = `uploads/${name}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
