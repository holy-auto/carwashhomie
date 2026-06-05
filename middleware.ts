import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/auth";

/* Guards the admin panel and its API. Unauthenticated requests to a
   page are redirected to the login screen; to an API route they get
   a 401. The login page and login endpoint are always reachable. */

const PUBLIC_PATHS = ["/admin/login", "/api/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await isValidSession(token, process.env.ADMIN_SESSION_SECRET);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "認証が必要です。" },
      { status: 401 },
    );
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = pathname === "/admin" ? "" : `?from=${pathname}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
