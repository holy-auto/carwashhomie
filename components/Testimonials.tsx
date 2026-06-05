"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/content";

/* Presentational testimonials grid. Data comes from the server
   (Supabase, with built-in fallbacks) via the `voices` prop. */

function initialOf(name: string): string {
  const ch = name.trim()[0];
  return ch ? ch.toUpperCase() : "★";
}

export default function Testimonials({ voices }: { voices: Testimonial[] }) {
  return (
    <section
      id="voice"
      className="relative py-24 md:py-32 bg-midnight overflow-hidden grain"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunset/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-chrome/60 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-chrome/20" />
            Customer Voice
            <div className="w-8 h-[1px] bg-chrome/20" />
          </div>
          <h2 className="font-display text-[2rem] md:text-5xl text-cream mb-6 leading-tight">
            お客様の声
          </h2>
          <p className="text-chrome/70 max-w-2xl mx-auto leading-relaxed font-readable">
            実際に施術を受けたお客様の声をご紹介します。
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {voices.map((v, idx) => (
            <motion.article
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="clinic-card relative bg-gradient-to-b from-midnight-50/20 to-midnight-100/40 backdrop-blur-sm border border-sunset/20 rounded-2xl p-7 overflow-hidden"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 font-display text-8xl text-sunset/20 leading-none select-none">
                &ldquo;
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-14 h-14 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome">
                  <span className="font-display text-2xl text-midnight font-bold">
                    {initialOf(v.author_name)}
                  </span>
                </div>
                <div>
                  <div className="text-cream font-semibold">{v.author_name}</div>
                  {v.car_model && (
                    <div className="text-chrome/60 text-xs">{v.car_model}</div>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-3 relative z-10">
                {Array.from({ length: v.rating }).map((_, i) => (
                  <span key={i} className="text-sunset">
                    ★
                  </span>
                ))}
              </div>

              {/* Title */}
              {v.title && (
                <h3 className="font-display text-xl text-cream mb-3 relative z-10 leading-snug">
                  {v.title}
                </h3>
              )}

              {/* Body */}
              <p className="text-chrome/70 text-sm leading-relaxed mb-5 relative z-10">
                {v.body}
              </p>

              {/* Treatment tag */}
              {v.treatment && (
                <div className="pt-4 border-t border-sunset/10 relative z-10">
                  <div className="text-[8px] tracking-[0.2em] text-cyan90/70 uppercase mb-1.5 font-pixel">
                    受けた施術
                  </div>
                  <div className="text-sunset text-sm font-pixel-jp">
                    {v.treatment}
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
