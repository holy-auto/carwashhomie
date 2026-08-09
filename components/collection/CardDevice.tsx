"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";
import CardArt from "@/components/collection/CardArt";

/* The left page of the book: a Greed Island "book" device that displays
   the selected card in its screen with a fold animation, plus the game
   controls (green buttons, dial, yellow D-pad). Inline — not a popup.
   ◀▶▲▼ flip through the collected cards. */

export default function CardDevice({
  card,
  index,
  total,
  onPrev,
  onNext,
}: {
  card: CollectibleCard | null;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [dir, setDir] = useState(1);
  const multi = total > 1;

  const go = (d: number) => {
    if (!multi) return;
    setDir(d);
    if (d > 0) onNext();
    else onPrev();
  };

  const r = card ? rarityMeta(card.rarity) : null;

  return (
    <div className="gi-device">
      <span className="gi-tab" />

      {/* screen */}
      <div className="gi-screen p-3 md:p-4 min-h-[280px] md:min-h-[340px] flex">
        {!card || !r ? (
          <div className="m-auto text-center px-4">
            <p className="font-crt text-cyan90/70 text-sm mb-1">▶ NO CARD</p>
            <p className="text-cream/50 text-[11px] font-readable">
              右のページで手に入れたカードをタップすると、ここに表示されます。
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={card.id}
              custom={dir}
              initial={{ scaleX: 0.04, rotateY: dir >= 0 ? 26 : -26, opacity: 0 }}
              animate={{ scaleX: 1, rotateY: 0, opacity: 1 }}
              exit={{ scaleX: 0.04, rotateY: dir >= 0 ? -26 : 26, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
              className="w-full flex flex-col items-center gap-3"
            >
              <div className="w-[132px] sm:w-[146px] aspect-[5/7] shadow-[0_10px_28px_-8px_rgba(0,0,0,0.85)]">
                <CardArt card={card} revealed />
              </div>

              <div className="w-full text-cream text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider"
                    style={{ background: r.frame, color: "#0a0b0e" }}
                  >
                    {r.label}
                  </span>
                  <span className="font-crt text-[11px] text-cyan90/80">
                    No.{card.card_number ?? "—"} ・ {card.code}
                  </span>
                </div>
                <h2 className="font-display text-lg md:text-xl leading-tight mb-2">
                  {card.name}
                </h2>
                <p className="text-cream/85 text-[11.5px] leading-relaxed font-readable whitespace-pre-wrap">
                  {card.description || "（説明は準備中です）"}
                </p>
                {card.instant_reward && (
                  <p className="mt-2 inline-block rounded bg-sunset/15 text-sunset px-2 py-1 text-[10px] border border-sunset/40">
                    ★ 単体で特典対象
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* controls */}
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="flex items-end gap-2.5">
          <div className="flex flex-col gap-1.5">
            <span className="gi-gbtn w-8 h-3.5 md:w-10 md:h-4" />
            <span className="gi-gbtn w-8 h-3.5 md:w-10 md:h-4" />
          </div>
          <span className="gi-dial w-10 h-10 md:w-12 md:h-12" />
        </div>

        <span className="font-crt text-[13px] text-[#243]/80 tabular-nums pb-1">
          {total > 0 ? `${index + 1} / ${total}` : "0 / 0"}
        </span>

        <div className="grid grid-cols-3 grid-rows-3 w-[76px] h-[76px] md:w-[88px] md:h-[88px] gap-0.5">
          <span />
          <button
            onClick={() => go(-1)}
            disabled={!multi}
            aria-label="前へ"
            className="gi-key rounded-t-md flex items-center justify-center text-xs disabled:opacity-45"
          >
            ▲
          </button>
          <span />
          <button
            onClick={() => go(-1)}
            disabled={!multi}
            aria-label="前のカード"
            className="gi-key rounded-l-md flex items-center justify-center text-xs disabled:opacity-45"
          >
            ◀
          </button>
          <span className="gi-key rounded-full" aria-hidden />
          <button
            onClick={() => go(1)}
            disabled={!multi}
            aria-label="次のカード"
            className="gi-key rounded-r-md flex items-center justify-center text-xs disabled:opacity-45"
          >
            ▶
          </button>
          <span />
          <button
            onClick={() => go(1)}
            disabled={!multi}
            aria-label="次へ"
            className="gi-key rounded-b-md flex items-center justify-center text-xs disabled:opacity-45"
          >
            ▼
          </button>
          <span />
        </div>
      </div>
    </div>
  );
}
