import { NextResponse } from "next/server";
import { isLineConfigured } from "@/lib/line";
import { currentMemberId, getMember } from "@/lib/members";

/* GET /api/me — who is logged in (LINE member), plus whether LINE login
   is available at all. Read by the client CollectionProvider. */

export const dynamic = "force-dynamic";

export async function GET() {
  const id = await currentMemberId();
  const member = id ? await getMember(id) : null;
  return NextResponse.json(
    { lineEnabled: isLineConfigured, member },
    { headers: { "Cache-Control": "no-store" } },
  );
}
