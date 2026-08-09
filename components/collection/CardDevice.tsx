"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";
import CardArt from "@/components/collection/CardArt";

/* Left page of the book: the Greed Island "book" device. Selecting a
   card in the holder "sets" it into the slot — it slides in, the screen
   scans it (scanline + LOADING), then the content is displayed. ◀▶▲▼
   flip through the collected cards; each flip re-runs the load. */

const LOAD_MS = 720;

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
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const multi = total > 1;

  // Re-run the "insert + scan" sequence whenever the shown card changes.
  useEffect(() => {
    if (!card) return;
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoading(false), LOAD_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [card?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="gi-screen p-3 md:p-4 min-h-[300px] md:min-h-[360px] flex">
        {!card || !r ? (
          <div className="m-auto text-center px-4">
            <p className="font-crt text-cyan90/70 text-sm mb-1">▶ NO CARD</p>
            <p className="text-cream/50 text-[11px] font-readable">
              右のホルダーで手に入れたカードをタップすると、ここにセットされます。
            </p>
          </div>
        ) : (
          <div className="relative w-full flex flex-col items-center gap-3">
            {/* the card being set into the slot */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={card.id}
                custom={dir}
                initial={{ y: 34, opacity: 0, rotateX: -12, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.34, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: "center bottom" }}
                className="w-[132px] sm:w-[146px] aspect-[5/7] shadow-[0_12px_28px_-8px_rgba(0,0,0,0.85)]"
              >
                <CardArt card={card} revealed />
                {/* dim veil while scanning */}
                <AnimatePresence>
                  {loading && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-[#04121a]/45"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* scanning line sweeping the whole screen */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  key="scan"
                  className="gi-scanbar"
                  initial={{ top: "-8%", opacity: 0 }}
                  animate={{ top: ["-8%", "104%"], opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: LOAD_MS / 1000, ease: "linear" }}
                />
              )}
            </AnimatePresence>

            {/* readout: LOADING → content */}
            <div className="w-full text-cream text-center min-h-[110px]">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="font-crt text-cyan90 text-sm tracking-widest animate-pulse mb-2">
                      ▶ NOW LOADING…
                    </p>
                    <div className="mx-auto w-40 h-1.5 rounded-full bg-cyan90/15 overflow-hidden border border-cyan90/25">
                      <motion.div
                        className="h-full bg-cyan90"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: LOAD_MS / 1000, ease: "linear" }}
                      />
                    </div>
                    <p className="mt-2 font-crt text-[10px] text-cream/40">
                      No.{card.card_number ?? "—"} ・ {card.code}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flicker"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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
