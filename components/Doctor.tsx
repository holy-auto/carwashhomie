"use client";

import { motion } from "framer-motion";

const profile = [
  { label: "国家資格", value: "二級自動車整備士" },
  { label: "専門", value: "整備 / 磨き / コーティング" },
  { label: "実務経験", value: "約9年" },
  { label: "Instagram", value: "@japanese_detailer_girl" },
  { label: "X", value: "@DetailerGirl" },
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
          <div className="inline-flex items-center gap-3 text-midnight/50 text-xs tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            Meet the Director
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h2 className="font-display text-[2rem] md:text-5xl text-midnight mb-6 leading-tight">
            院長紹介
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed font-readable">
            車の美容外科女医が、あなたの愛車を診察します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* License Card — Auto Aesthetic Hunter License */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <a
              href="https://www.instagram.com/japanese_detailer_girl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @japanese_detailer_girl"
              className="block relative group"
            >
              {/* Outer foil bezel */}
              <div
                className="aspect-[3/4] rounded-2xl p-[2px] shadow-clinic relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-sunset-glow"
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b1a 0%, #f5d8a0 35%, #c8b78a 50%, #f5d8a0 65%, #ff6b1a 100%)",
                }}
              >
                {/* Holographic shimmer band */}
                <motion.div
                  aria-hidden
                  initial={{ x: "-120%" }}
                  whileInView={{ x: "120%" }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
                    mixBlendMode: "screen",
                  }}
                />

                {/* Inner card body */}
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#1a0f08] via-[#241409] to-[#1a0f08] overflow-hidden grain vhs-scan crt-roll">
                  {/* Engraved guilloché pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-radial-gradient(circle at 50% 50%, rgba(255,107,26,0.5) 0px, rgba(255,107,26,0.5) 1px, transparent 1px, transparent 14px)",
                    }}
                  />

                  {/* Top bar — issuer + serial */}
                  <div className="absolute top-0 left-0 right-0 px-5 pt-5 flex items-start justify-between">
                    <div>
                      <div className="text-[7px] tracking-[0.25em] text-sunset/90 font-pixel">
                        AUTO AESTHETIC ASSOCIATION
                      </div>
                      <div className="text-cream font-chunky text-sm tracking-wider uppercase mt-1">
                        Detailer License
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] tracking-[0.2em] text-chrome/60 uppercase font-pixel">
                        Serial No.
                      </div>
                      <div className="text-sunset font-crt text-base tracking-wider leading-none">
                        AAH-001-JDG
                      </div>
                    </div>
                  </div>

                  {/* Center — portrait */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6">
                    <div className="relative">
                      <div className="w-44 h-44 rounded-full bg-gradient-to-b from-sunset/40 to-sunset/10 blur-2xl" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl">
                        👩‍⚕️
                      </div>
                      {/* Star rank ring */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight/80 border border-sunset/40 backdrop-blur-sm">
                        <span className="text-sunset text-xs">★</span>
                        <span className="text-sunset text-xs">★</span>
                        <span className="text-chrome/40 text-xs">★</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar — name + qualification + issued */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                    <div className="border-t border-dashed border-sunset/30 pt-3">
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[7px] tracking-[0.2em] text-chrome/50 uppercase font-pixel">
                            Holder
                          </div>
                          <div className="font-pixel-jp text-cream text-xl leading-tight mt-1">
                            中山 春香
                          </div>
                          <div className="text-sunset/90 text-[8px] tracking-widest uppercase mt-1 font-pixel">
                            Japanese Detailer Girl
                          </div>
                        </div>
                        {/* Hologram chip */}
                        <div
                          className="w-10 h-10 rounded-md shrink-0 relative overflow-hidden border border-cream/20"
                          style={{
                            background:
                              "linear-gradient(135deg, #ff6b1a, #f5d8a0, #c8b78a, #ff6b1a)",
                          }}
                        >
                          <div className="absolute inset-0 grid place-items-center text-[7px] font-pixel text-midnight tracking-tighter">
                            AAH
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[10px] font-crt text-chrome/70 tracking-wider leading-none">
                        <span>QUAL: Lv.2 Auto Mechanic</span>
                        <span>ISSUED 2026.04.15</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner notches */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-sunset/40" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-sunset/40" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-sunset/40" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-sunset/40" />
                </div>
              </div>

            </a>

            {/* Tiny worldview footnote under card */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-[8px] tracking-[0.25em] text-midnight/60 uppercase font-pixel">
                <span className="h-[1px] w-6 bg-midnight/20" />
                AAH Licensed Detailer
                <span className="h-[1px] w-6 bg-midnight/20" />
              </div>
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
              <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-pixel mb-3">
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

            {/* Social CTA — 2 lines so the long handle never overflows */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://www.instagram.com/japanese_detailer_girl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-sunset text-sunset font-bold hover:bg-sunset hover:text-midnight transition-all max-w-full"
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
              <a
                href="https://x.com/DetailerGirl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-sunset text-sunset font-bold hover:bg-sunset hover:text-midnight transition-all max-w-full"
              >
                <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="flex flex-col items-start leading-tight min-w-0 text-left">
                  <span className="text-sm md:text-base break-all">
                    @DetailerGirl
                  </span>
                  <span className="text-xs tracking-wider opacity-80">
                    をフォロー
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
