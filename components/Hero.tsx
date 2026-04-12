"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight grain">
      {/* Subtle clinic ambient light */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-100 to-midnight" />

      {/* Elegant thin chrome rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-chrome/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-chrome/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-chrome/10" />
      </div>

      {/* Single subtle sunset accent at bottom */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sunset/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 text-center">
        {/* Opening badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-midnight-50/40 border border-chrome/20 backdrop-blur-sm mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-pulse" />
          <span className="text-chrome/80 text-xs tracking-[0.3em] uppercase font-semibold">
            2025年 4月15日 OPEN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-pulse" />
        </motion.div>

        {/* Logo image - hero center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Car Wash Homies"
            width={400}
            height={400}
            priority
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto object-contain rounded-2xl drop-shadow-[0_0_40px_rgba(255,107,26,0.4)]"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream leading-[1.1] tracking-tight">
            <span className="text-cream">車の</span>
            <span className="candy-text">美容外科</span>
          </h1>
          <div className="mt-3 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-chrome/30" />
            <span className="text-chrome/50 text-[10px] tracking-[0.4em] uppercase">
              Automotive Aesthetic Clinic
            </span>
            <span className="h-[1px] w-12 bg-chrome/30" />
          </div>
        </motion.div>

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-chrome/80 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          ただのコーティング屋さんじゃない。
          <br className="hidden md:block" />
          <span className="text-sunset font-semibold">車の美容外科</span>です。
        </motion.p>

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
            href="#coating"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-cream/30 text-cream hover:border-sunset hover:text-sunset transition-all backdrop-blur-sm"
          >
            施術メニューを見る
          </a>
        </motion.div>

        {/* Policy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-chrome/50 uppercase font-semibold mb-4">
            <span className="h-[1px] w-6 bg-chrome/20" />
            Our Policy
            <span className="h-[1px] w-6 bg-chrome/20" />
          </div>
          <p className="font-display text-2xl md:text-3xl text-cream leading-relaxed">
            「車の寿命を延ばし、
            <br className="md:hidden" />
            <span className="candy-text">価値を守る</span>」
          </p>
          <p className="text-chrome/60 text-sm mt-3">
            それが当院のポリシーです。
          </p>
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
