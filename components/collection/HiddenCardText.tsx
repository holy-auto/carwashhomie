"use client";

import { useEffect, useRef, useState } from "react";
import CardLink from "@/components/collection/CardLink";
import { renderCardText, hasCardToken } from "@/components/collection/renderCardText";
import { useCollection } from "@/components/collection/CollectionProvider";
import { useCardHunt } from "@/components/collection/CardHuntProvider";
import type { CollectibleCard } from "@/lib/content";

/* Hides a collectible card at a RANDOM spot in the given text, chosen
   per page view on the client — so every reader (and every visit) finds
   cards in different places. Encourages actually reading the article.

   - Server renders the plain text (no hydration mismatch, SEO intact);
     after mount we roll the dice and, if it lands, wrap a random short
     phrase in a subtle CardLink.
   - Prefers not-yet-collected cards (rarer ones appear less often); once
     everything is collected, nothing is hidden.
   - If the text already contains a manual [語](card:CODE) token, that
     pinned placement wins and no random card is added. */

const RARITY_WEIGHT: Record<string, number> = {
  N: 1,
  R: 0.6,
  SR: 0.3,
  SS: 0.12,
};

/** Delimiters we won't cross or wrap — keeps the highlighted run readable. */
const DELIM = /[\s、。，．・！？!?…「」『』（）()【】［］\[\]〈〉《》〜ー—–\-:：;；]/;

function weightedPick(list: CollectibleCard[]): CollectibleCard {
  const w = list.map((c) => RARITY_WEIGHT[(c.rarity || "N").toUpperCase()] ?? 0.5);
  const sum = w.reduce((a, b) => a + b, 0) || 1;
  let r = Math.random() * sum;
  for (let i = 0; i < list.length; i++) {
    r -= w[i];
    if (r <= 0) return list[i];
  }
  return list[list.length - 1];
}

/** Pick a short, delimiter-free run of the text to turn into the link. */
function pickSpan(text: string): { start: number; end: number } | null {
  const runs: Array<[number, number]> = [];
  let i = 0;
  while (i < text.length) {
    if (DELIM.test(text[i])) {
      i++;
      continue;
    }
    let j = i;
    while (j < text.length && !DELIM.test(text[j])) j++;
    if (j - i >= 2) runs.push([i, j]);
    i = j;
  }
  if (runs.length === 0) return null;
  const [s, e] = runs[Math.floor(Math.random() * runs.length)];
  const len = e - s;
  if (len <= 6) return { start: s, end: e };
  const wlen = 3 + Math.floor(Math.random() * 3); // 3–5 chars
  const start = s + Math.floor(Math.random() * (len - wlen + 1));
  return { start, end: start + wlen };
}

export default function HiddenCardText({
  text,
  chance = 0.4,
}: {
  text: string | null | undefined;
  /** Probability this block hides a card (when uncollected cards remain). */
  chance?: number;
}) {
  const { loaded, cards, collectedSet } = useCollection();
  const { claim } = useCardHunt();
  const [placement, setPlacement] = useState<{
    start: number;
    end: number;
    code: string;
  } | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !loaded || !text) return;
    done.current = true;
    if (hasCardToken(text)) return; // manual pin wins
    const uncollected = cards.filter((c) => !collectedSet.has(c.code));
    if (uncollected.length === 0) return;
    if (Math.random() > chance) return;
    const span = pickSpan(text);
    if (!span) return;
    if (!claim()) return; // page limit reached
    const card = weightedPick(uncollected);
    setPlacement({ ...span, code: card.code });
  }, [loaded, text, chance, cards, collectedSet, claim]);

  if (!text) return null;

  // Manual tokens (or before the client roll) → render as-is.
  if (!placement) return <>{renderCardText(text)}</>;

  const before = text.slice(0, placement.start);
  const mid = text.slice(placement.start, placement.end);
  const after = text.slice(placement.end);
  return (
    <>
      {before}
      <CardLink code={placement.code}>{mid}</CardLink>
      {after}
    </>
  );
}
