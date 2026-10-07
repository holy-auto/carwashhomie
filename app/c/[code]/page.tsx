"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCollection } from "@/components/collection/CollectionProvider";
import CardArt from "@/components/collection/CardArt";

/* Redeem page: /c/<CARD-CODE>. Visiting it adds that card to the
   collection — so a QR code or printed code (in-store, on a receipt, a
   flyer, an event card) grants a card in the real world. Blends the
   game with reality, Greed Island style. */

export default function RedeemPage({ params }: { params: { code: string } }) {
  const code = decodeURIComponent(params.code || "").toUpperCase();
  const { loaded, cardsByCode, has, collect } = useCollection();
  const card = cardsByCode[code];
  const [alreadyHad, setAlreadyHad] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (!loaded || !card || done.current) return;
    done.current = true;
    if (has(code)) setAlreadyHad(true);
    else collect(code);
  }, [loaded, card, code, has, collect]);

  return (
    <div className="pt-20">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-midnight grain py-20 px-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-sunset/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan90/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-sm text-center">
          {!loaded ? (
            <p className="font-crt text-cyan90/70">読み込み中…</p>
          ) : !card ? (
            <>
              <h1 className="font-display text-2xl text-cream mb-3">
                カードが見つかりません
              </h1>
              <p className="text-chrome/70 text-sm font-readable mb-8">
                コード「{code}」のカードは見つかりませんでした。
                <br />
                QRやコードをもう一度ご確認ください。
              </p>
              <Link
                href="/book"
                className="inline-block rounded-full bg-sunset text-midnight font-bold px-6 py-3"
              >
                カードブックを見る
              </Link>
            </>
          ) : (
            <>
              <p className="font-pixel-jp text-[11px] tracking-[0.3em] text-sunset mb-4">
                {alreadyHad ? "このカードは取得済み" : "カードを手に入れた！"}
              </p>
              <motion.div
                initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto w-[220px] max-w-full aspect-[5/7]"
              >
                <CardArt card={card} revealed />
              </motion.div>
              <h1 className="font-display text-2xl text-cream mt-5 mb-1">
                {card.name}
              </h1>
              {card.description && (
                <p className="text-chrome/70 text-sm font-readable leading-relaxed mb-8">
                  {card.description}
                </p>
              )}
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/book"
                  className="inline-block rounded-full bg-sunset text-midnight font-bold px-6 py-3"
                >
                  カードブックで見る
                </Link>
                <Link href="/" className="text-chrome/60 text-sm hover:text-sunset">
                  トップへ戻る
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
