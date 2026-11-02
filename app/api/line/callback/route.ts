import { NextResponse, type NextRequest } from "next/server";
import {
  exchangeToken,
  verifyIdToken,
  getFriendshipStatus,
  isLineConfigured,
} from "@/lib/line";
import { MEMBER_COOKIE, createMemberToken } from "@/lib/member-auth";
import { upsertMember } from "@/lib/members";

/* GET /api/line/callback?code=&state=
   LINE redirects here. Verify state, exchange the code, verify the
   id_token, record the member, set the session cookie, and send the
   browser back to where it started (default /book). */

export const dynamic = "force-dynamic";

function fail(origin: string, reason: string) {
  const url = new URL("/book", origin);
  url.searchParams.set("login", "error");
  url.searchParams.set("reason", reason);
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  if (!isLineConfigured) return fail(origin, "unconfigured");

  const params = req.nextUrl.searchParams;
  const code = params.get("code");
  const state = params.get("state");
  const cookieState = req.cookies.get("cwh_line_state")?.value;
  const returnTo = req.cookies.get("cwh_line_return")?.value || "/book";

  if (params.get("error")) return fail(origin, "denied");
  if (!code || !state || !cookieState || state !== cookieState) {
    return fail(origin, "state");
  }

  try {
    const redirectUri = `${origin}/api/line/callback`;
    const token = await exchangeToken(code, redirectUri);
    const profile = await verifyIdToken(token.id_token);
    const isFriend = await getFriendshipStatus(token.access_token);
    await upsertMember(profile, isFriend);

    const dest = returnTo.startsWith("/") && !returnTo.startsWith("//")
      ? returnTo
      : "/book";
    const url = new URL(dest, origin);
    url.searchParams.set("login", "ok");

    const res = NextResponse.redirect(url);
    const secure = origin.startsWith("https://");
    res.cookies.set(MEMBER_COOKIE, await createMemberToken(profile.sub), {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 120, // 120 days
    });
    // Clear the transient OAuth cookies.
    res.cookies.set("cwh_line_state", "", { path: "/", maxAge: 0 });
    res.cookies.set("cwh_line_return", "", { path: "/", maxAge: 0 });
    return res;
  } catch (e) {
    console.error("LINE callback:", e);
    return fail(origin, "exchange");
  }
}
