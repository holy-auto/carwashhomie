import { NextResponse, type NextRequest } from "next/server";
import { currentMemberId, getMemberCollection, addMemberCards } from "@/lib/members";

/* GET  /api/me/collection      — the logged-in member's card codes
   POST /api/me/collection {code|codes} — add one or many (merge), returns
   the full collection. 401 when not logged in. */

export const dynamic = "force-dynamic";

export async function GET() {
  const id = await currentMemberId();
  if (!id) return NextResponse.json({ error: "not_logged_in" }, { status: 401 });
  const codes = await getMemberCollection(id);
  return NextResponse.json({ codes }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const id = await currentMemberId();
  if (!id) return NextResponse.json({ error: "not_logged_in" }, { status: 401 });

  let body: { code?: unknown; codes?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const list: string[] = [];
  if (typeof body.code === "string") list.push(body.code);
  if (Array.isArray(body.codes)) {
    for (const c of body.codes) if (typeof c === "string") list.push(c);
  }
  const codes = await addMemberCards(id, list.map((c) => c.toUpperCase()));
  return NextResponse.json({ codes }, { headers: { "Cache-Control": "no-store" } });
}
