"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { useCollection } from "@/components/collection/CollectionProvider";
import CardArt from "@/components/collection/CardArt";
import CardDevice from "@/components/collection/CardDevice";
import { MILESTONES } from "@/lib/collection";

/* The collection book (/book) as an open Greed Island spread:
   LEFT page = the "book" device that displays the selected card,
   RIGHT page = the parchment binder of sleeve pockets. Tapping a
   collected pocket loads it into the device on the left. */

const ALL = "すべて";

export default function Book() {
  const {
    loaded,
    cards,
    has,
    total,
    collectedCount,
    points,
    reached,
    next,
    overGuestLimit,
  } = useCollection();
  const [series, setSeries] = useState<string>(ALL);
  const [selIdx, setSelIdx] = useState(0);
  const deviceRef = useRef<HTMLDivElement>(null);

  const seriesList = useMemo(() => {
    const set = new Set<string>();
    for (const c of cards) if (c.series) set.add(c.series);
    return [ALL, ...Array.from(set)];
  }, [cards]);

  const shown = useMemo(
    () => (series === ALL ? cards : cards.filter((c) => c.series === series)),
    [cards, series],
  );

  // Collected cards within the current filter — the set the device flips through.
  const collectedShown = useMemo(
    () => shown.filter((c) => has(c.code)),
    [shown, has],
  );

  // Keep the selected index in range as the collection / filter changes.
  useEffect(() => {
    if (selIdx > collectedShown.length - 1) {
      setSelIdx(Math.max(0, collectedShown.length - 1));
    }
  }, [collectedShown.length, selIdx]);

  const selectedCard = collectedShown[selIdx] ?? null;

  function selectCard(id: string) {
    const i = collectedShown.findIndex((c) => c.id === id);
    if (i < 0) return;
    setSelIdx(i);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      deviceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const target = next?.points ?? (MILESTONES[MILESTONES.length - 1]?.points || 1);
  const pct = Math.min(100, Math.round((points / target) * 100));
  const topReward = reached[reached.length - 1] ?? null;

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-midnight overflow-hidden grain">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sunset/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan90/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
        {/* title plate */}
        <div className="text-center mb-5">
          <span className="gi-plate font-display text-lg md:text-2xl tracking-wide">
            収集手帳
          </span>
          <p className="mt-3 text-[10px] tracking-[0.35em] uppercase font-pixel text-[#e9cf87]/80">
            Collection Book
          </p>
        </div>

        {/* open spread */}
        <div className="gi-spread">
          <div className="grid md:grid-cols-[1fr_26px_1.12fr] gap-5 md:gap-0">
            {/* LEFT page — the device */}
            <div ref={deviceRef} className="md:pr-3">
              <CardDevice
                card={selectedCard}
                index={selIdx}
                total={collectedShown.length}
                onPrev={() =>
                  setSelIdx(
                    (i) =>
                      (i - 1 + collectedShown.length) % collectedShown.length,
                  )
                }
                onNext={() =>
                  setSelIdx((i) => (i + 1) % collectedShown.length)
                }
              />
            </div>

            {/* centre spine + rings */}
            <div className="gi-spine-rings">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="gi-ring" />
              ))}
            </div>

            {/* RIGHT page — the binder */}
            <div className="gi-pages md:ml-3">
              {/* progress plate */}
              <div className="relative rounded-xl border border-[#a9843f]/50 bg-[#f5ecd3]/70 p-4 shadow-inner mb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-pixel-jp text-[11px] tracking-wider text-[#5b4a2e]">
                    あつめた枚数
                  </span>
                  <span className="font-crt text-2xl text-[#7a4a1a] tabular-nums">
                    {collectedCount}
                    <span className="text-[#a9843f]">/{total}</span>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[#d8c49a] overflow-hidden border border-[#a9843f]/40">
                  <motion.div
                    className="h-full bg-sunset-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className="mt-2 text-center text-[11px] text-[#5b4a2e] font-readable">
                  {next
                    ? `次の「${next.title}」まであと ${Math.max(0, Math.round((target - points) * 10) / 10)} ポイント`
                    : "全マイルストーン達成！コンプリートを目指そう。"}
                </p>

                {topReward && (
                  <a
                    href={BUSINESS.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex flex-col items-center gap-0.5 rounded-lg bg-[#0d3d31] text-[#e9cf87] px-4 py-2.5 font-bold border border-[#c9a24b]/60 hover:bg-[#124a3c] transition"
                  >
                    <span className="text-sm">🎁 {topReward.title}特典を受け取る</span>
                    <span className="text-[10px] font-normal text-[#e9cf87]/80">
                      {topReward.reward}（LINEで提示・店頭でお渡し）
                    </span>
                  </a>
                )}
              </div>

              {overGuestLimit && (
                <div className="mb-5 rounded-lg border border-[#a9843f]/40 bg-[#efe3c3]/80 px-4 py-2.5 text-center text-[11px] text-[#5b4a2e] font-readable">
                  いまはこの端末にカードを保存しています。LINE連携（会員登録）で機種変更後も引き継げるようになります（近日公開）。
                </div>
              )}

              {/* series bookmarks */}
              {seriesList.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {seriesList.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeries(s)}
                      className={`px-3 py-1.5 rounded-t-md text-[11px] font-pixel-jp tracking-wider border-b-2 transition ${
                        series === s
                          ? "bg-[#0d3d31] text-[#e9cf87] border-[#c9a24b]"
                          : "bg-[#e0cfa5] text-[#5b4a2e] border-transparent hover:border-[#a9843f]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* pockets */}
              {!loaded ? (
                <p className="text-center text-[#5b4a2e]/70 py-14 font-readable">
                  読み込み中…
                </p>
              ) : total === 0 ? (
                <p className="text-center text-[#5b4a2e]/70 py-14 font-readable">
                  カードは現在準備中です。もうしばらくお待ちください。
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {shown.map((c, idx) => {
                    const got = has(c.code);
                    const active = selectedCard?.id === c.id;
                    return (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.32, delay: Math.min(idx * 0.03, 0.3) }}
                      >
                        {got ? (
                          <button
                            type="button"
                            onClick={() => selectCard(c.id)}
                            className={`gi-pocket gi-sleeve block w-full text-left cursor-pointer transition-transform hover:-translate-y-0.5 ${
                              active ? "ring-2 ring-sunset ring-offset-2 ring-offset-[#e6d6ae]" : ""
                            }`}
                            aria-label={`${c.name} を端末で表示`}
                          >
                            <CardArt card={c} revealed />
                          </button>
                        ) : (
                          <div className="gi-pocket gi-pocket--empty text-center">
                            <span className="gi-slotno text-[10px] tracking-wider">
                              No.{c.card_number ?? "??"}
                            </span>
                            <span className="font-chunky text-3xl text-[#8a6a34]/40 leading-none">
                              ？
                            </span>
                            <span className="px-2 text-[9px] leading-tight text-[#6b5327]/80 font-readable line-clamp-2">
                              {c.hint || "サイトのどこかに"}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-[#e9cf87]/50 font-readable">
          カードは施術事例・お役立ち情報のページに潜んでいます。読みながら探してみてください。
        </p>
      </div>
    </section>
  );
}
