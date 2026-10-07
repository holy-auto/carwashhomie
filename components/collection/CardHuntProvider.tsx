"use client";

import { createContext, useContext, useRef } from "react";

/* Page-scoped budget for random card placements. Wrap a page's text
   blocks in <CardHuntProvider limit={N}>; each HiddenCardText that is
   about to hide a card calls claim() first, so a single page never
   reveals more than N random cards (manual [..](card:CODE) pins and the
   /c/<code> redeem page are not counted). Resets on each mount, so a
   fresh visit is a fresh hunt. */

type CardHunt = { claim: () => boolean };

const CardHuntContext = createContext<CardHunt>({ claim: () => true });

export function useCardHunt(): CardHunt {
  return useContext(CardHuntContext);
}

export default function CardHuntProvider({
  limit = 2,
  children,
}: {
  limit?: number;
  children: React.ReactNode;
}) {
  const used = useRef(0);
  const value = useRef<CardHunt>({
    claim: () => {
      if (used.current >= limit) return false;
      used.current += 1;
      return true;
    },
  });
  return (
    <CardHuntContext.Provider value={value.current}>
      {children}
    </CardHuntContext.Provider>
  );
}
