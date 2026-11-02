import { NextResponse } from "next/server";
import { MEMBER_COOKIE } from "@/lib/member-auth";

/* POST /api/line/logout — clear the member session cookie. */

export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(MEMBER_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
