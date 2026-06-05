"use client";

import { motion } from "framer-motion";
import type { NewsPost } from "@/lib/content";

/* Presentational お知らせ / news list. Data comes from Supabase via
   the `posts` prop. Body text preserves line breaks; an optional
   image is shown above the text. */

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

export default function News({ posts }: { posts: NewsPost[] }) {
  return (
    <section
      id="news"
      className="relative py-24 md:py-32 bg-midnight overflow-hidden grain"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-sunset/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-chrome/60 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-chrome/20" />
            News
            <div className="w-8 h-[1px] bg-chrome/20" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-cream mb-6 leading-tight">
            お知らせ
          </h1>
          <p className="text-chrome/70 max-w-2xl mx-auto leading-relaxed font-readable">
            最新情報・キャンペーン・営業のご案内をお届けします。
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-center text-chrome/50 py-12 font-readable">
            現在お知らせはありません。
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
                className="clinic-card bg-gradient-to-b from-midnight-50/20 to-midnight-100/40 backdrop-blur-sm border border-sunset/20 rounded-2xl p-6 md:p-8 overflow-hidden"
              >
                <time className="text-[10px] tracking-[0.2em] text-sunset uppercase font-pixel">
                  {formatDate(post.published_at)}
                </time>
                <h2 className="font-display text-2xl md:text-3xl text-cream mt-2 mb-4 leading-snug">
                  {post.title}
                </h2>

                {post.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full rounded-xl mb-5 border border-sunset/10"
                  />
                )}

                {post.body && (
                  <p className="text-chrome/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-readable">
                    {post.body}
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
