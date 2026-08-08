import { NextResponse } from "next/server";
import { getCards } from "@/lib/content";

/* GET /api/cards — public list of PUBLISHED collectible cards.
   Read by the client CollectionProvider to render the book / badge
   and to look up each dropped card's visual. Kept dynamic so newly
   published cards appear without a redeploy. */

export const dynamic = "force-dynamic";

export async function GET() {
  const cards = await getCards();
  return NextResponse.json(
    { cards },
    { headers: { "Cache-Control": "no-store" } },
  );
}
