"use client";

import { motion } from "framer-motion";
import type { UsefulArticle } from "@/lib/content";

/* お役立ち情報 — お知らせ（ブログ）とは別の、洗車・メンテナンスに
   まつわるお役立ちコンテンツ枠。データは Supabase から `articles`
   プロップスとして渡される。本文は改行を保持して表示する。 */

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(d);
}

export default function Useful({ articles }: { articles: UsefulArticle[] }) {
  return (
    <section
      id="useful"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="absolute inset-0 memphis-dots-sunset opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-sunset/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan90/[0.06] rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-midnight/50 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            Useful Tips
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-midnight mb-6 leading-tight">
            お役立ち情報
          </h1>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed font-readable">
            洗車・コーティング・メンテナンスにまつわる豆知識やお手入れのコツを、車の美容外科の視点でお届けします。
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <p className="text-center text-midnight/50 py-12 font-readable">
            お役立ち情報は現在準備中です。
          </p>
        ) : (
          <div className="space-y-8">
            {articles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
                className="clinic-card bg-white border border-midnight/10 rounded-2xl p-6 md:p-8 shadow-clinic overflow-hidden"
              >
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  {article.category && (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-sunset text-midnight">
                      {article.category}
                    </span>
                  )}
                  <time className="text-[10px] tracking-[0.2em] text-midnight/50 uppercase font-pixel">
                    {formatDate(article.published_at)}
                  </time>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-midnight mt-1 mb-4 leading-snug">
                  {article.title}
                </h2>

                {article.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full rounded-xl mb-5 border border-midnight/10"
                  />
                )}

                {article.excerpt && (
                  <p className="text-sunset/90 text-sm md:text-base font-semibold leading-relaxed mb-3 font-readable">
                    {article.excerpt}
                  </p>
                )}

                {article.body && (
                  <p className="text-midnight/75 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-readable">
                    {article.body}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
