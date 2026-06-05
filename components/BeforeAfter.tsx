"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { BUSINESS } from "@/lib/constants";
import type { GalleryCase } from "@/lib/content";

/* Presentational Before/After gallery. Data comes from the server
   (Supabase, with built-in fallbacks) via the `cases` prop. Each
   case shows real before/after photos when uploaded; otherwise it
   falls back to the original candy-paint colour gradients. */

function layerStyle(
  imageUrl: string | null,
  color: string | null,
  fallbackColor: string,
  edgeColor: string,
): React.CSSProperties {
  if (imageUrl) {
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  const c = color || fallbackColor;
  return {
    background: `radial-gradient(ellipse at center, ${c} 0%, ${c}dd 40%, ${edgeColor} 100%)`,
  };
}

function Slider({ caseData }: { caseData: GalleryCase }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const hasAfterImg = Boolean(caseData.after_image_url);
  const hasBeforeImg = Boolean(caseData.before_image_url);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-clinic border border-midnight/10"
      onMouseDown={(e) => {
        dragging.current = true;
        updatePos(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      {/* After (bottom layer) */}
      <div
        className="absolute inset-0"
        style={layerStyle(
          caseData.after_image_url,
          caseData.after_color,
          "#ff6b1a",
          "#1a0f08",
        )}
      >
        {!hasAfterImg && <div className="absolute inset-0 grain" />}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-sunset text-midnight text-xs font-bold tracking-wider">
          AFTER
        </div>
      </div>

      {/* Before (clipped top layer) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          ...layerStyle(
            caseData.before_image_url,
            caseData.before_color,
            "#5a4a3a",
            "#0a0604",
          ),
        }}
      >
        {!hasBeforeImg && <div className="absolute inset-0 grain" />}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-midnight/80 text-chrome text-xs font-bold tracking-wider border border-chrome/20">
          BEFORE
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-sunset pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-sunset shadow-sunset-glow flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-midnight"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M8 7l-5 5 5 5M16 7l5 5-5 5"
            />
          </svg>
        </div>
      </div>

      {/* Code label */}
      {caseData.code && (
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-midnight/80 text-sunset text-[10px] font-pixel tracking-widest border border-sunset/30">
          {caseData.code}
        </div>
      )}
    </div>
  );
}

export default function BeforeAfter({ cases }: { cases: GalleryCase[] }) {
  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 bg-midnight overflow-hidden grain"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/95 to-midnight" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sunset/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-chrome/50 text-xs tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-chrome/20" />
            Case Study
            <div className="w-8 h-[1px] bg-chrome/20" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-cream mb-6 leading-tight">
            施術<span className="text-sunset">事例</span>
          </h1>
          <p className="text-chrome/70 max-w-2xl mx-auto leading-relaxed font-readable">
            施術前後の変化をご確認ください。
            <br className="md:hidden" />
            バーをドラッグすると違いが一目でわかります。
          </p>
        </motion.div>

        {/* Cases */}
        <div className="space-y-20">
          {cases.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
              }`}
            >
              <Slider caseData={c} />

              {/* Clinical notes */}
              <div className="lg:p-8">
                {c.code && (
                  <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel mb-3">
                    {c.code}
                  </div>
                )}
                <h3 className="font-display text-3xl md:text-4xl text-cream mb-4 leading-tight">
                  {c.title}
                </h3>

                <div className="space-y-4 mb-6">
                  {c.before_note && (
                    <div className="flex items-start gap-3">
                      <span className="mt-1 px-2 py-0.5 rounded bg-chrome/20 text-chrome text-[10px] font-bold tracking-wider">
                        施術前
                      </span>
                      <p className="text-chrome/70 text-sm leading-relaxed flex-1">
                        {c.before_note}
                      </p>
                    </div>
                  )}
                  {c.after_note && (
                    <div className="flex items-start gap-3">
                      <span className="mt-1 px-2 py-0.5 rounded bg-sunset text-midnight text-[10px] font-bold tracking-wider">
                        施術後
                      </span>
                      <p className="text-cream text-sm leading-relaxed flex-1">
                        {c.after_note}
                      </p>
                    </div>
                  )}
                </div>

                {c.service && (
                  <div className="pt-4 border-t border-sunset/20">
                    <div className="text-[10px] tracking-wider text-chrome/50 uppercase mb-1">
                      施術内容
                    </div>
                    <div className="text-sunset font-semibold">{c.service}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram @${BUSINESS.instagramHandle}`}
            className="inline-flex items-center gap-3 text-sunset font-bold hover:gap-5 transition-all"
          >
            Instagramでもっと施行事例を見る
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
