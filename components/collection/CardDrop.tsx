"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCollection } from "@/components/collection/CollectionProvider";
import CardArt from "@/components/collection/CardArt";

/* A collectible card hidden inside a case / article. Renders a glinting
   "facedown" prompt until tapped; on tap it records the card in the
   local collection, fires a toast, and flips to reveal the card face. */

export default function CardDrop({ code }: { code: string | null }) {
  const { loaded, cardsByCode, has, collect, toast, overGuestLimit } =
    useCollection();
  const [justGot, setJustGot] = useState(false);

  if (!code) return null;

  const card = cardsByCode[code];

  // While the master list is still loading we don't know the card's
  // visual yet — render a slim placeholder to avoid layout jump.
  if (!loaded) {
    return (
      <div className="my-8 flex justify-center" aria-hidden>
        <div className="w-[240px] h-[300px] rounded-xl border border-white/10 bg-white/[0.03] animate-pulse" />
      </div>
    );
  }

  // Loaded but the code doesn't match a published card → show nothing.
  if (!card) return null;

  const collected = has(code);

  function handleCollect() {
    if (collected || !card) return;
    collect(card.code);
    setJustGot(true);
    toast(`「${card.name}」を手に入れた！`);
  }

  return (
    <div className="my-10 flex flex-col items-center">
      <div className="w-[240px] max-w-full">
        <AnimatePresence mode="wait">
          {collected ? (
            <motion.div
              key="face"
              initial={justGot ? { rotateY: 90, opacity: 0 } : false}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardArt card={card} revealed />
              <p className="mt-2 text-center text-[11px] font-pixel-jp tracking-wider text-sunset">
                {justGot ? "手に入れた！" : "取得済み"}
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="back"
              type="button"
              onClick={handleCollect}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative block w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-sunset/60 shadow-sunset-glow"
              aria-label="カードを手に入れる"
            >
              <div className="foil absolute inset-0 opacity-70" />
              <div className="absolute inset-0 bg-midnight/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-3">
                <span className="font-chunky text-3xl text-cream drop-shadow">
                  ✦
                </span>
                <span className="font-pixel-jp text-[12px] tracking-wider text-cream">
                  カードを発見！
                </span>
                <span className="font-pixel-jp text-[10px] tracking-wider text-sunset animate-pulse">
                  タップで手に入れる
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {collected && overGuestLimit && (
        <p className="mt-3 max-w-xs text-center text-[11px] leading-relaxed text-midnight/60 font-readable">
          たくさん集めていますね！{" "}
          <Link href="/book" className="text-sunset font-bold underline">
            ブック
          </Link>{" "}
          で進捗と特典を確認できます。（LINE連携での会員保存は近日公開）
        </p>
      )}
    </div>
  );
}
