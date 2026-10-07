"use client";

import CardHuntProvider from "@/components/collection/CardHuntProvider";
import HiddenCardText from "@/components/collection/HiddenCardText";

/* Client island for an article detail page body: renders the text and,
   on the client, may hide ONE random collectible card somewhere in it
   (different spot per reader / visit). Used by お役立ち記事 detail pages. */

export default function ArticleBodyCards({
  text,
  chance = 0.8,
}: {
  text: string;
  chance?: number;
}) {
  return (
    <CardHuntProvider limit={1}>
      <HiddenCardText text={text} chance={chance} />
    </CardHuntProvider>
  );
}
