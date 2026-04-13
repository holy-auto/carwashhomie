"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";

const menu = [
  {
    num: "01",
    label: "Concept",
    title: "当院のコンセプト",
    desc: "車の美容外科のポリシーと診察方針。塗装状態・使用環境・年式を診断。",
    href: "/concept",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    label: "Menu",
    title: "施術メニュー",
    desc: "ボディ・内装・ガラス・ホイール・洗車の料金一覧。業者様向けも対応。",
    href: "/menu",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "Gallery",
    title: "施術事例",
    desc: "Before / After で見る仕上がり。実際の診断・処置の事例紹介。",
    href: "/gallery",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    label: "Doctor",
    title: "院長紹介",
    desc: "中山 春香 — 二級自動車整備士。実務経験約9年、SNSでも情報発信。",
    href: "/doctor",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    num: "05",
    label: "Reservation",
    title: "ご予約・ご相談",
    desc: "無料カウンセリング受付中。お電話・Instagram DM・フォームから。",
    href: "/reservation",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: "06",
    label: "Access",
    title: "アクセス",
    desc: "埼玉県さいたま市岩槻区末田2421-2。岩槻ICから約10分・駐車場完備。",
    href: "/access",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function MenuOverview() {
  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* 90s memphis polka backdrop */}
      <div className="absolute inset-0 memphis-dots opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan90/[0.08] rounded-full blur-3xl" />

      {/* Top + bottom zigzag accents */}
      <div className="absolute top-0 left-0 right-0 memphis-zig" />
      <div className="absolute bottom-0 left-0 right-0 memphis-zig rotate-180" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="sticker mb-4">
            ★ Site Menu ★
          </div>
          <h2 className="font-display text-[clamp(1.4rem,6.5vw,3rem)] md:text-5xl text-midnight mb-4 leading-tight whitespace-nowrap">
            診察科目<span className="candy-90s-text retro-italic">・</span>各種ご案内
          </h2>
          <p className="text-midnight/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-readable">
            気になる項目をお選びください。
            <br className="sm:hidden" />
            詳細ページにてご案内いたします。
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menu.map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Link
                href={item.href}
                className="group block h-full bg-white border-2 border-midnight rounded-2xl p-7 shadow-retro-pop hover:shadow-retro-pop-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cream border-2 border-midnight text-midnight flex items-center justify-center shadow-[3px_3px_0_0_#FF6B1A] group-hover:bg-sunset group-hover:shadow-[3px_3px_0_0_#FF2E97] transition-all">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] tracking-[0.2em] text-midnight uppercase font-pixel bg-cream border border-midnight rounded px-1.5 py-1 inline-block">
                      No.{item.num}
                    </div>
                    <div className="text-[8px] tracking-wider text-magenta uppercase font-pixel mt-1.5">
                      ★ {item.label}
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-midnight mb-2 group-hover:text-sunset transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-midnight/70 leading-relaxed mb-5">
                  {item.desc}
                </p>
                <div className="border-t-2 border-dashed border-midnight/30 pt-4 flex items-center justify-between">
                  <span className="text-midnight font-pixel uppercase tracking-wider text-[9px]">
                    &gt; 詳しく見る
                  </span>
                  <span className="text-sunset font-extrabold text-lg group-hover:translate-x-1 transition-transform">
                    ▶
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick contact bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            aria-label={`電話 ${BUSINESS.phone}`}
            className="flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-midnight border-2 border-midnight text-cream shadow-retro-pop-sunset hover:shadow-retro-pop-magenta hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            <svg aria-hidden="true" className="w-5 h-5 text-cyan90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-[9px] tracking-[0.2em] text-cyan90 font-pixel uppercase">Tel</span>
            <span className="font-crt text-2xl tracking-wider leading-none">{BUSINESS.phone}</span>
          </a>
          <Link href="/reservation" className="btn-90s justify-center !w-full">
            <span className="w-2 h-2 rounded-full bg-midnight animate-pulse" />
            無料カウンセリングを予約
            <span>▶</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
