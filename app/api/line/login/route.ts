import { NextResponse, type NextRequest } from "next/server";
import { authorizeUrl, isLineConfigured } from "@/lib/line";

/* GET /api/line/login?returnTo=/book
   Starts LINE Login: sets a CSRF state cookie and the post-login return
   path, then redirects to LINE's authorize screen (with the add-friend
   prompt for the linked official account). */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isLineConfigured) {
    return NextResponse.json(
      { error: "LINEログインは未設定です。" },
      { status: 503 },
    );
  }

  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/line/callback`;
  const state = crypto.randomUUID();

  const rawReturn = req.nextUrl.searchParams.get("returnTo") || "/book";
  // Only allow same-site relative paths.
  const returnTo = rawReturn.startsWith("/") && !rawReturn.startsWith("//")
    ? rawReturn
    : "/book";

  const res = NextResponse.redirect(
    authorizeUrl({ redirectUri, state, addFriend: true }),
  );
  const secure = origin.startsWith("https://");
  const opts = {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  };
  res.cookies.set("cwh_line_state", state, opts);
  res.cookies.set("cwh_line_return", returnTo, opts);
  return res;
}
