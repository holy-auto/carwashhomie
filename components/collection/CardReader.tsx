"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";
import CardArt from "@/components/collection/CardArt";

/* Two-page spread reader. Opening a collected card "loads" it into an
   open book with a page-turn; prev/next flips through the collected
   cards. Esc / arrow keys and a tap outside also work. */

export default function CardReader({
  cards,
  index,
  onClose,
  onIndex,
}: {
  cards: CollectibleCard[];
  index: number;
  onClose: () => void;
  onIndex: (next: number, dir: number) => void;
}) {
  const [dir, setDir] = useState(1);
  const card = cards[index];

  const go = useCallback(
    (d: number) => {
      if (cards.length === 0) return;
      const n = (index + d + cards.length) % cards.length;
      setDir(d);
      onIndex(n, d);
    },
    [cards.length, index, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!card) return null;
  const r = rarityMeta(card.rarity);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="reader-book w-full max-w-3xl"
          initial={{ scale: 0.9, opacity: 0, rotateX: 8 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* close */}
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-midnight text-cream border-2 border-[#c9a24b] shadow-lg flex items-center justify-center hover:bg-midnight/80"
          >
            ✕
          </button>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={card.id}
              custom={dir}
              initial={{ scaleX: 0.04, rotateY: dir >= 0 ? 28 : -28, opacity: 0 }}
              animate={{ scaleX: 1, rotateY: 0, opacity: 1 }}
              exit={{ scaleX: 0.04, rotateY: dir >= 0 ? -28 : 28, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
              className="grid grid-cols-1 md:grid-cols-[1fr_14px_1fr] gap-4 md:gap-0 items-stretch"
            >
              {/* left page — the card */}
              <div className="reader-page p-5 md:p-6 flex items-center justify-center">
                <div className="w-[185px] max-w-full aspect-[5/7]">
                  <CardArt card={card} revealed />
                </div>
              </div>

              {/* spine */}
              <div className="reader-spine hidden md:block rounded" />

              {/* right page — the reading */}
              <div className="reader-page p-5 md:p-7 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider"
                    style={{ background: r.frame, color: "#0b0c10" }}
                  >
                    {r.label}
                  </span>
                  <span className="font-crt text-[12px] text-[#6b5327]">
                    No.{card.card_number ?? "—"} ・ {card.code}
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl text-[#3a2a12] leading-tight mb-2">
                  {card.name}
                </h2>

                {card.category && (
                  <span className="self-start mb-3 rounded-full border border-[#a9843f]/60 px-2.5 py-0.5 text-[10px] text-[#5b4a2e]">
                    {card.category}
                  </span>
                )}

                <div className="h-[2px] w-16 bg-[#a9843f]/50 mb-3" />

                <p className="text-[#3a2a12] text-[13px] md:text-sm leading-relaxed font-readable whitespace-pre-wrap flex-1">
                  {card.description || "（説明は準備中です）"}
                </p>

                {card.instant_reward && (
                  <p className="mt-3 rounded-lg bg-[#0d3d31] text-[#e9cf87] px-3 py-2 text-[11px] border border-[#c9a24b]/50">
                    ★ このカードは単体で特典対象。ブックの特典ボタンからLINEで受け取れます。
                  </p>
                )}

                {card.series && (
                  <p className="mt-3 text-[10px] text-[#6b5327]/80">
                    シリーズ：{card.series}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* pager */}
          {cards.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="前のカード"
                className="w-9 h-9 rounded-full bg-[#e0cfa5] text-[#3a2a12] border border-[#a9843f] flex items-center justify-center hover:bg-[#ecdcb6]"
              >
                ‹
              </button>
              <span className="font-crt text-sm text-[#e9cf87] tabular-nums">
                {index + 1} / {cards.length}
              </span>
              <button
                onClick={() => go(1)}
                aria-label="次のカード"
                className="w-9 h-9 rounded-full bg-[#e0cfa5] text-[#3a2a12] border border-[#a9843f] flex items-center justify-center hover:bg-[#ecdcb6]"
              >
                ›
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
