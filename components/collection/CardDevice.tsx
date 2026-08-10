"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectibleCard } from "@/lib/content";
import { rarityMeta } from "@/lib/collection";
import CardArt from "@/components/collection/CardArt";
import Illustration from "@/components/collection/Illustration";

/* Left page of the book: the Greed Island "book" device.
   - TOP: the big screen displays the selected card's content
     (enlarged art + name + description), with a scan / LOADING sequence.
   - BOTTOM: the controls. The physical card is SET into a slot between
     the dial and the D-pad. ◀▶▲▼ flip through the collected cards. */

const LOAD_MS = 720;

function Art({ card }: { card: CollectibleCard }) {
  const accent = card.accent_color || "#2b3550";
  if (card.image_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={card.image_url}
        alt={card.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return <Illustration accent={accent} />;
}

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

  // Re-run the "set + scan" sequence whenever the shown card changes.
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

      {/* ── TOP: big screen shows the content ── */}
      <div className="gi-screen p-3 md:p-4 min-h-[300px] md:min-h-[340px] flex">
        {!card || !r ? (
          <div className="m-auto text-center px-4">
            <p className="font-crt text-cyan90/70 text-sm mb-1">▶ NO CARD</p>
            <p className="text-cream/50 text-[12px] font-readable">
              右のホルダーで手に入れたカードをタップすると、スロットにセットされて内容が表示されます。
            </p>
          </div>
        ) : (
          <div className="relative w-full">
            {/* scanning line */}
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

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                >
                  <p className="font-crt text-cyan90 text-base tracking-widest animate-pulse">
                    ▶ NOW LOADING…
                  </p>
                  <div className="w-44 h-1.5 rounded-full bg-cyan90/15 overflow-hidden border border-cyan90/25">
                    <motion.div
                      className="h-full bg-cyan90"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: LOAD_MS / 1000, ease: "linear" }}
                    />
                  </div>
                  <p className="font-crt text-[11px] text-cream/40">
                    No.{card.card_number ?? "—"} ・ {card.code}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`content-${card.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flicker text-cream"
                >
                  {/* enlarged artwork */}
                  <div
                    className="relative w-full aspect-[16/10] rounded-md overflow-hidden mb-3"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${r.frame}80` }}
                  >
                    <Art card={card} />
                    <div className="foil absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                    <span
                      className="absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider"
                      style={{ background: r.frame, color: "#0a0b0e" }}
                    >
                      {r.label}
                    </span>
                    <span className="absolute top-1.5 right-1.5 font-crt text-[11px] text-cream/85 bg-black/45 rounded px-1.5 py-0.5">
                      No.{card.card_number ?? "—"} ・ {card.code}
                    </span>
                    {card.category && (
                      <span className="absolute bottom-1.5 left-1.5 rounded-full border border-cream/40 bg-black/40 px-2 py-0.5 text-[10px] text-cream/85">
                        {card.category}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-xl md:text-2xl leading-tight mb-2">
                    {card.name}
                  </h2>
                  <p className="text-cream/85 text-[13px] leading-relaxed font-readable whitespace-pre-wrap">
                    {card.description || "（説明は準備中です）"}
                  </p>
                  {card.instant_reward && (
                    <p className="mt-2 inline-block rounded bg-sunset/15 text-sunset px-2 py-1 text-[11px] border border-sunset/40">
                      ★ このカードは単体で特典対象
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── BOTTOM: controls (dial ─ card slot ─ D-pad) ── */}
      <div className="mt-3 flex items-end justify-between gap-2">
        {/* green buttons + dial */}
        <div className="flex items-end gap-2">
          <div className="flex flex-col gap-1.5">
            <span className="gi-gbtn w-7 h-3 md:w-9 md:h-4" />
            <span className="gi-gbtn w-7 h-3 md:w-9 md:h-4" />
          </div>
          <span className="gi-dial w-9 h-9 md:w-12 md:h-12" />
        </div>

        {/* the card SET into the slot */}
        <div className="flex flex-col items-center gap-1">
          <div className="gi-slot">
            {card ? (
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={card.id}
                  custom={dir}
                  initial={{ y: -36, opacity: 0, scale: 0.94 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 26, opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.34, ease: [0.33, 1, 0.68, 1] }}
                  className="w-[92px] sm:w-[104px] aspect-[5/7]"
                >
                  <CardArt card={card} revealed />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-[92px] sm:w-[104px] aspect-[5/7] rounded-md border border-dashed border-white/25 flex items-center justify-center text-white/30 text-[10px] font-pixel-jp">
                SLOT
              </div>
            )}
          </div>
          <span className="font-crt text-[12px] text-[#243]/80 tabular-nums">
            {total > 0 ? `${index + 1} / ${total}` : "0 / 0"}
          </span>
        </div>

        {/* yellow D-pad */}
        <div className="grid grid-cols-3 grid-rows-3 w-[72px] h-[72px] md:w-[86px] md:h-[86px] gap-0.5">
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
