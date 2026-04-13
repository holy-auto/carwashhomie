"use client";

import { motion } from "framer-motion";

const profile = [
  { label: "国家資格", value: "二級自動車整備士" },
  { label: "専門", value: "整備 / 磨き / コーティング" },
  { label: "実務経験", value: "約9年" },
  { label: "Instagram", value: "@japanese_detailer_girl" },
];

const achievements = [
  "国家資格 二級自動車整備士",
  "整備 / 磨き / コーティング 実務経験 約9年",
  "イベント施工 / デモ実績多数",
  "SNSを通じた情報発信・来院実績",
];

export default function Doctor() {
  return (
    <section
      id="doctor"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-sunset/30 to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-sunset/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-midnight/50 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            Meet the Director
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6">
            院長紹介
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            車の美容外科女医が、あなたの愛車を診察します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Frame */}
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-midnight via-midnight to-sunset/60 p-1 shadow-clinic">
                <div className="w-full h-full rounded-xl bg-gradient-to-b from-midnight/90 via-midnight/70 to-sunset/40 relative overflow-hidden grain">
                  {/* Silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-b from-sunset/40 to-sunset/10 blur-2xl" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">
                        👩‍⚕️
                      </div>
                    </div>
                  </div>
                  {/* Pinstripe accents */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sunset to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sunset to-transparent" />
                  {/* Name badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-display text-cream text-2xl mb-1">
                      中山 春香
                    </div>
                    <div className="text-chrome/80 text-xs tracking-widest uppercase">
                      Director / Japanese Detailer Girl
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram badge */}
              <a
                href="https://www.instagram.com/japanese_detailer_girl/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome rotate-6 hover:rotate-0 transition-transform group"
              >
                <div className="text-center">
                  <div className="text-midnight text-lg font-bold group-hover:scale-110 transition-transform">
                    IG
                  </div>
                  <div className="text-[8px] text-midnight/80 font-bold tracking-wider">
                    FOLLOW
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sunset/10 border border-sunset/20 text-sunset text-xs font-bold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sunset" />
              院長（代表者）
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-midnight mb-2">
              中山 春香
            </h3>
            <div className="text-sunset font-semibold mb-6">
              車の美容外科女医 a.k.a JDG
            </div>

            <p className="text-midnight/70 leading-relaxed mb-8">
              国家資格 二級自動車整備士。整備・磨き・コーティングの実務経験約9年。
              イベント施工やデモの実績も多数持ち、SNSを通じた情報発信で
              多くのお客様にご来院いただいています。
              <br />
              <br />
              車の美容外科として、塗装状態・使用環境・年式を丁寧に診断。
              お値段やニーズに合わせて、車のスタイリストとしてもお気軽にご相談ください。
            </p>

            {/* Profile grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {profile.map((p) => {
                const isInstagram = p.label === "Instagram";
                return (
                  <div
                    key={p.label}
                    className="bg-white border border-midnight/10 rounded-xl p-4 shadow-clinic min-w-0"
                  >
                    <div className="text-[10px] tracking-wider text-midnight/50 uppercase mb-1">
                      {p.label}
                    </div>
                    <div
                      className={`text-midnight font-display ${
                        isInstagram
                          ? "text-sm md:text-base break-all leading-snug"
                          : "text-lg"
                      }`}
                    >
                      {p.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Achievements */}
            <div>
              <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-3">
                Profile
              </div>
              <ul className="space-y-2">
                {achievements.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 text-sm text-midnight/80"
                  >
                    <span className="mt-1 w-4 h-4 rounded-full bg-sunset-gradient flex items-center justify-center shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-midnight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram CTA — 2 lines so the long handle never overflows */}
            <a
              href="https://www.instagram.com/japanese_detailer_girl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-2xl border-2 border-sunset text-sunset font-bold hover:bg-sunset hover:text-midnight transition-all max-w-full"
            >
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="flex flex-col items-start leading-tight min-w-0 text-left">
                <span className="text-sm md:text-base break-all">
                  @japanese_detailer_girl
                </span>
                <span className="text-xs tracking-wider opacity-80">
                  をフォロー
                </span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
