"use client";

import { motion } from "framer-motion";

const certifications = [
  "日本カーディテーリング協会 認定Aグレード",
  "ローライダー オーナーズクラブ 公認施術士",
  "ガラスコーティング マスター資格",
  "クロームポリッシュ スペシャリスト",
];

const profile = [
  { label: "経験年数", value: "15年" },
  { label: "年間施術台数", value: "1,200+" },
  { label: "専門", value: "ローライダー / クラシックカー" },
  { label: "出身", value: "East Los Angeles" },
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
          <div className="inline-flex items-center gap-3 text-sunset text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-sunset" />
            Meet Your Doctor
            <div className="w-8 h-[1px] bg-sunset" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6">
            Dr. ホーミー
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            愛車のかかりつけ医。ローライダーへの愛を込めて、一台一台を丁寧に"診察"します。
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
                  {/* Silhouette "placeholder" */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Body */}
                      <div className="w-48 h-48 rounded-full bg-gradient-to-b from-sunset/40 to-sunset/10 blur-2xl" />
                      {/* Head icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">
                        🧔🏽
                      </div>
                    </div>
                  </div>
                  {/* Pinstripe accents */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sunset to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sunset to-transparent" />
                  {/* Name badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-script text-sunset text-2xl mb-1 tracking-widest">
                      DR. HOMIE
                    </div>
                    <div className="text-chrome/80 text-xs tracking-widest uppercase">
                      Chief Detailing Officer
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature badge */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome rotate-12">
                <div className="text-center">
                  <div className="text-[10px] text-midnight font-bold tracking-wider">
                    SINCE
                  </div>
                  <div className="text-midnight font-display text-2xl leading-none">
                    2010
                  </div>
                </div>
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
            <h3 className="font-display text-3xl md:text-4xl text-midnight mb-2">
              "愛車は、オーナーの人生そのもの。"
            </h3>
            <div className="font-script text-sunset text-xl mb-6 tracking-wider">
              — Dr. Homie
            </div>

            <p className="text-midnight/70 leading-relaxed mb-8">
              15歳のときに見たインパラの輝きに魅せられ、洗車とディテーリングの世界へ。
              East LA で修行を積み、ローライダーカルチャーの深い理解を持つ数少ない日本人ディテーラー。
              <br />
              <br />
              「一台一台に"カルテ"を作って、その車の履歴と状態を把握する。
              だから次の施術で何をすべきかがわかる。ただの洗車じゃなく、
              愛車の"主治医"でありたい。」
            </p>

            {/* Profile grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {profile.map((p) => (
                <div
                  key={p.label}
                  className="bg-white border border-midnight/10 rounded-xl p-4 shadow-clinic"
                >
                  <div className="text-[10px] tracking-wider text-midnight/50 uppercase mb-1">
                    {p.label}
                  </div>
                  <div className="text-midnight font-display text-lg">
                    {p.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-3">
                Certifications
              </div>
              <ul className="space-y-2">
                {certifications.map((c) => (
                  <li
                    key={c}
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
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
