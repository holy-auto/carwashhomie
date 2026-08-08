"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { useCollection } from "@/components/collection/CollectionProvider";
import CardArt from "@/components/collection/CardArt";
import { MILESTONES } from "@/lib/collection";

/* The collection book (/book): binder grid of every published card.
   Collected cards show their face + tip; uncollected show a silhouette
   with a hint. A progress gauge tracks the weighted count toward the
   next milestone, whose reward is claimed via the LINE shop card. */

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

  const seriesList = useMemo(() => {
    const set = new Set<string>();
    for (const c of cards) if (c.series) set.add(c.series);
    return [ALL, ...Array.from(set)];
  }, [cards]);

  const shown = useMemo(
    () => (series === ALL ? cards : cards.filter((c) => c.series === series)),
    [cards, series],
  );

  const target = next?.points ?? (MILESTONES[MILESTONES.length - 1]?.points || 1);
  const pct = Math.min(100, Math.round((points / target) * 100));
  const topReward = reached[reached.length - 1] ?? null;

  return (
    <section className="relative min-h-screen py-24 md:py-28 bg-midnight overflow-hidden grain">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sunset/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-magenta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 text-chrome/50 text-[10px] tracking-[0.3em] uppercase font-pixel mb-3">
            <div className="w-8 h-[1px] bg-chrome/20" />
            Collection Book
            <div className="w-8 h-[1px] bg-chrome/20" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-cream mb-3 leading-tight">
            カード<span className="text-sunset">ブック</span>
          </h1>
          <p className="text-chrome/60 text-sm font-readable">
            サイトに潜むカードを集めて、洗車のお役立ち情報とごほうびをコンプリート。
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-xl mx-auto mb-10 rounded-2xl border border-sunset/25 bg-white/[0.04] p-5">
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-pixel-jp text-[11px] tracking-wider text-chrome/70">
              あつめた枚数
            </span>
            <span className="font-crt text-2xl text-sunset tabular-nums">
              {collectedCount}
              <span className="text-chrome/40 text-lg">/{total}</span>
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-midnight/60 overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-sunset-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="mt-2 text-center text-[11px] text-chrome/60 font-readable">
            {next
              ? `次の「${next.title}」まであと ${Math.max(0, Math.round((target - points) * 10) / 10)} ポイント`
              : "全マイルストーン達成！コンプリートを目指そう。"}
          </p>

          {topReward && (
            <a
              href={BUSINESS.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex flex-col items-center gap-1 rounded-xl bg-sunset text-midnight px-4 py-3 font-bold hover:opacity-90 transition"
            >
              <span className="text-sm">🎁 {topReward.title}特典を受け取る</span>
              <span className="text-[10px] font-normal">
                {topReward.reward}（LINEで提示・店頭でお渡し）
              </span>
            </a>
          )}
        </div>

        {overGuestLimit && (
          <div className="max-w-xl mx-auto mb-8 rounded-xl border border-cyan90/30 bg-cyan90/5 px-4 py-3 text-center text-[12px] text-chrome/75 font-readable">
            いまはこの端末にカードを保存しています。
            <br className="sm:hidden" />
            LINE連携（会員登録）で機種変更後も引き継げるようになります（近日公開）。
          </div>
        )}

        {/* Series tabs */}
        {seriesList.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {seriesList.map((s) => (
              <button
                key={s}
                onClick={() => setSeries(s)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-pixel-jp tracking-wider border transition ${
                  series === s
                    ? "bg-sunset text-midnight border-sunset"
                    : "text-chrome/70 border-chrome/20 hover:border-sunset/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loaded ? (
          <p className="text-center text-chrome/50 py-16 font-readable">
            読み込み中…
          </p>
        ) : total === 0 ? (
          <p className="text-center text-chrome/50 py-16 font-readable">
            カードは現在準備中です。もうしばらくお待ちください。
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {shown.map((c, idx) => {
              const got = has(c.code);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.3) }}
                  className={got ? "" : "opacity-90"}
                >
                  <CardArt card={c} revealed={got} />
                </motion.div>
              );
            })}
          </div>
        )}

        <p className="mt-12 text-center text-[11px] text-chrome/40 font-readable">
          カードは施術事例・お役立ち情報のページに潜んでいます。読みながら探してみてください。
        </p>
      </div>
    </section>
  );
}
