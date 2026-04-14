"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight grain vhs-scan crt-roll flicker">
      {/* Subtle clinic ambient light */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-100 to-midnight" />

      {/* 90s retro grid floor — vaporwave horizon */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 retro-grid opacity-60 [mask-image:linear-gradient(to_top,black,transparent)]" />

      {/* Elegant thin chrome rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-chrome/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-chrome/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-chrome/10" />
      </div>

      {/* Single subtle sunset accent at bottom */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sunset/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16 text-center">
        {/* AAH license badge — worldview anchor */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="flex items-center gap-1 text-sunset">
            <span className="text-[10px] leading-none">★</span>
            <span className="text-[10px] leading-none">★</span>
          </span>
          <span className="text-chrome/60 text-[8px] tracking-[0.3em] uppercase font-pixel">
            AAH Licensed Detailer · No.001
          </span>
          <span className="flex items-center gap-1 text-sunset">
            <span className="text-[10px] leading-none">★</span>
            <span className="text-[10px] leading-none">★</span>
          </span>
        </motion.div>

        {/* Opening badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="sticker mb-10 !bg-cyan90/20 !text-cream !border-cyan90 shadow-neon-cyan"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan90 animate-pulse" />
          <span className="font-pixel">2026.04.15 ★ NOW OPEN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse" />
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
            <span className="font-pixel-jp text-cream text-3xl md:text-5xl lg:text-6xl">車の</span>
            <span className="candy-90s-text retro-italic">美容外科</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-chrome/30" />
            <span className="font-pixel text-chrome/60 text-[8px] tracking-[0.3em] uppercase">
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
          <br />
          <span className="text-sunset font-semibold">車の美容外科</span>です。
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/reservation" className="btn-90s group">
            <span className="w-2 h-2 rounded-full bg-midnight" />
            無料カウンセリングを予約
            <svg
              aria-hidden="true"
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
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-cream font-extrabold uppercase tracking-[0.18em] text-xs text-cream bg-midnight/40 hover:bg-cream hover:text-midnight transition-all shadow-[4px_4px_0_0_#00E5FF] hover:shadow-[6px_6px_0_0_#FF2E97] backdrop-blur-sm"
          >
            施術メニューを見る
          </Link>
        </motion.div>

        {/* Policy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 text-[8px] tracking-[0.3em] text-cyan90/80 uppercase font-pixel mb-4">
            <span className="h-[1px] w-6 bg-cyan90/40" />
            Our Policy
            <span className="h-[1px] w-6 bg-cyan90/40" />
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

        {/* Scroll indicator — inline so it always stays below the policy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2 text-cream/50"
        >
          <span className="font-pixel text-[8px] tracking-[0.4em] uppercase animate-bounce text-magenta/80">
            ▼ Scroll ▼
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-sunset to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
