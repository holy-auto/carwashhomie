"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";
import CardArt from "@/components/collection/CardArt";

/* Card reader styled after the Greed Island "book" device: a blue-grey
   panel with a red tab, a big screen showing the selected card + its
   readout, and the game controls — two green buttons, a dial, and a
   functional yellow D-pad (◀▶ flip, centre closes). Cards flip with a
   fold animation. Esc / arrow keys also work. */

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
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!card) return null;
  const r = rarityMeta(card.rarity);
  const multi = cards.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/78 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="gi-device w-full max-w-3xl"
          initial={{ scale: 0.92, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="gi-tab" />
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-midnight text-cream border-2 border-[#c9a24b] shadow-lg flex items-center justify-center hover:bg-midnight/80"
          >
            ✕
          </button>

          {/* screen */}
          <div className="gi-screen p-3 md:p-5 min-h-[300px] md:min-h-[340px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={card.id}
                custom={dir}
                initial={{ scaleX: 0.04, rotateY: dir >= 0 ? 26 : -26, opacity: 0 }}
                animate={{ scaleX: 1, rotateY: 0, opacity: 1 }}
                exit={{ scaleX: 0.04, rotateY: dir >= 0 ? -26 : 26, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center"
              >
                {/* the card, slotted */}
                <div className="mx-auto w-[150px] sm:w-[168px] aspect-[5/7] rounded-md shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)]">
                  <CardArt card={card} revealed />
                </div>

                {/* readout */}
                <div className="flex flex-col text-cream">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider"
                      style={{ background: r.frame, color: "#0a0b0e" }}
                    >
                      {r.label}
                    </span>
                    <span className="font-crt text-[12px] text-cyan90/80">
                      No.{card.card_number ?? "—"} ・ {card.code}
                    </span>
                  </div>

                  <h2 className="font-display text-xl md:text-2xl text-cream leading-tight mb-2">
                    {card.name}
                  </h2>

                  {card.category && (
                    <span className="self-start mb-3 rounded-full border border-cream/30 px-2.5 py-0.5 text-[10px] text-cream/75">
                      {card.category}
                    </span>
                  )}

                  <div className="h-[2px] w-14 bg-cyan90/40 mb-3" />

                  <p className="text-cream/85 text-[12px] md:text-[13px] leading-relaxed font-readable whitespace-pre-wrap">
                    {card.description || "（説明は準備中です）"}
                  </p>

                  {card.instant_reward && (
                    <p className="mt-3 rounded-lg bg-sunset/15 text-sunset px-3 py-2 text-[11px] border border-sunset/40">
                      ★ このカードは単体で特典対象。ブックの特典ボタンからLINEで受け取れます。
                    </p>
                  )}
                  {card.series && (
                    <p className="mt-3 text-[10px] text-cream/50">
                      シリーズ：{card.series}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-4 flex items-end justify-between gap-4">
            {/* left cluster: green buttons + dial */}
            <div className="flex items-end gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="gi-gbtn w-9 h-4 md:w-11 md:h-5" />
                <span className="gi-gbtn w-9 h-4 md:w-11 md:h-5" />
              </div>
              <span className="gi-dial w-11 h-11 md:w-14 md:h-14" />
            </div>

            {/* pager */}
            <span className="font-crt text-sm text-[#2b2b2b] tabular-nums pb-1">
              {index + 1} / {cards.length}
            </span>

            {/* yellow D-pad */}
            <div className="grid grid-cols-3 grid-rows-3 w-24 h-24 md:w-28 md:h-28 gap-0.5">
              <span />
              <button
                onClick={() => multi && go(-1)}
                disabled={!multi}
                aria-label="前へ"
                className="gi-key rounded-t-md flex items-center justify-center text-sm disabled:opacity-50"
              >
                ▲
              </button>
              <span />
              <button
                onClick={() => multi && go(-1)}
                disabled={!multi}
                aria-label="前のカード"
                className="gi-key rounded-l-md flex items-center justify-center text-sm disabled:opacity-50"
              >
                ◀
              </button>
              <button
                onClick={onClose}
                aria-label="閉じる"
                className="gi-key rounded-full flex items-center justify-center text-[9px] font-bold"
              >
                ✕
              </button>
              <button
                onClick={() => multi && go(1)}
                disabled={!multi}
                aria-label="次のカード"
                className="gi-key rounded-r-md flex items-center justify-center text-sm disabled:opacity-50"
              >
                ▶
              </button>
              <span />
              <button
                onClick={() => multi && go(1)}
                disabled={!multi}
                aria-label="次へ"
                className="gi-key rounded-b-md flex items-center justify-center text-sm disabled:opacity-50"
              >
                ▼
              </button>
              <span />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
