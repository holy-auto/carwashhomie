"use client";

import { useCollection } from "@/components/collection/CollectionProvider";

/* An inline, understated card-get link embedded in article/case text.
   Readers who are paying attention notice the glint and tap it to add
   the card. Written in content as [表示テキスト](card:CODE). Once held,
   it becomes a quiet link to the book. */

export default function CardLink({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const { has, collect, toast, cardsByCode } = useCollection();
  const got = has(code);
  const name = cardsByCode[code]?.name;

  function handle(e: React.MouseEvent) {
    if (got) return; // already held → let it navigate to /book
    e.preventDefault();
    collect(code);
    toast(name ? `「${name}」を手に入れた！` : "カードを手に入れた！");
  }

  return (
    <a
      href="/book"
      onClick={handle}
      data-got={got}
      className="chw-cardlink"
      aria-label={got ? "取得済みのカード（ブックで見る）" : "カードを手に入れる"}
    >
      {children}
      <span className="chw-cardlink__mark" aria-hidden="true">
        {got ? "✓" : "✦"}
      </span>
    </a>
  );
}
