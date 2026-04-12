"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight grain">
      {/* Background candy paint glow */}
      <div className="absolute inset-0 bg-candy-paint opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-transparent to-midnight" />

      {/* Animated chrome rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-sunset/10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sunset/20 animate-pulse [animation-delay:500ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-sunset/30 animate-pulse [animation-delay:1000ms]" />
      </div>

      {/* Sunset glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sunset/40 via-sunset/10 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 text-center">
        {/* Top accent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-midnight/60 border border-sunset/30 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-sunset animate-pulse" />
          <span className="text-sunset text-xs tracking-[0.3em] uppercase font-semibold">
            Est. 2025 · With Love from the Homies
          </span>
          <span className="w-2 h-2 rounded-full bg-sunset animate-pulse" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] mb-6 tracking-tight"
        >
          愛車にも、
          <br />
          <span className="candy-text">美容整形</span>
          <span className="text-cream">という選択を。</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-chrome/80 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
        >
          ローライダー専門の洗車・ディテーリングクリニック。
          <br className="hidden md:block" />
          そのボディ、くすんでませんか？—— ホーミーの流儀で、極上に仕上げます。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-script text-2xl md:text-3xl chrome-text mb-12 tracking-widest"
        >
          THE AUTO AESTHETIC CLINIC
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#reservation"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sunset-gradient text-midnight font-bold shadow-chrome hover:shadow-sunset-glow transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-midnight" />
            無料カウンセリングを予約
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-cream/30 text-cream hover:border-sunset hover:text-sunset transition-all backdrop-blur-sm"
          >
            施術メニューを見る
          </a>
        </motion.div>

        {/* Stats bar (clinic style) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-3 gap-4 md:gap-12 max-w-3xl mx-auto"
        >
          {[
            { num: "1,200+", label: "年間施術台数" },
            { num: "15年", label: "ディテーリング歴" },
            { num: "98.7%", label: "お客様満足度" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center border-l border-sunset/30 first:border-l-0 px-2"
            >
              <div className="font-display text-3xl md:text-5xl text-sunset mb-1">
                {s.num}
              </div>
              <div className="text-chrome/60 text-xs md:text-sm tracking-wider uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60 animate-bounce">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-sunset to-transparent" />
      </div>
    </section>
  );
}
