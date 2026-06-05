import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  passwordMatches,
} from "@/lib/auth";

/* POST /api/admin/login — exchange the admin password for a signed
   session cookie. Exempt from the middleware guard. */

export async function POST(req: Request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const expected = process.env.ADMIN_PASSWORD;

  if (!secret || !expected) {
    return NextResponse.json(
      {
        error:
          "管理画面が未設定です。ADMIN_PASSWORD と ADMIN_SESSION_SECRET を設定してください。",
      },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  if (!passwordMatches(password, expected)) {
    return NextResponse.json(
      { error: "パスワードが違います。" },
      { status: 401 },
    );
  }

  const token = await createSessionToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
