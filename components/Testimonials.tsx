"use client";

import { motion } from "framer-motion";

const voices = [
  {
    initial: "K",
    name: "K.T 様",
    age: "42歳",
    car: "Chevrolet Impala '64",
    treatment: "プレミアム美白ケア",
    rating: 5,
    title: "もう他のお店には戻れません",
    body: "10年所有してきた愛車が新車以上の輝きに。カウンセリングも丁寧で、施術内容をカルテで説明してくれるのが嬉しい。ローライダー乗りの気持ちがわかってる人に任せられる安心感。",
  },
  {
    initial: "M",
    name: "M.S 様",
    age: "35歳",
    car: "Cadillac DeVille '72",
    treatment: "トータル リフトアップ",
    rating: 5,
    title: "ボディの透明感が別物",
    body: "くすんでいたオレンジが深みのあるキャンディカラーに蘇って、駐車場で二度見されます。Dr.ホーミーの仕事は芸術。定期メンテで通う価値があります。",
  },
  {
    initial: "Y",
    name: "Y.H 様",
    age: "51歳",
    car: "Lincoln Continental '65",
    treatment: "エイジングケア",
    rating: 5,
    title: "愛車の若返りを実感",
    body: "年式相応の経年感に諦めかけていたけど、施術後は「これ本当に同じ車？」と家族にも驚かれる仕上がり。美容外科というコンセプトが的確で笑ってしまった。",
  },
];

export default function Testimonials() {
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
          <div className="inline-flex items-center gap-3 text-sunset text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-sunset" />
            Customer Voice
            <div className="w-8 h-[1px] bg-sunset" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-cream mb-6">
            お客様の声
          </h2>
          <p className="text-chrome/70 max-w-2xl mx-auto leading-relaxed">
            実際に施術を受けたホーミーたちの声をご紹介します。
          </p>
        </motion.div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-16 flex-wrap"
        >
          <div className="text-center">
            <div className="font-display text-6xl text-sunset leading-none mb-2">
              4.98
            </div>
            <div className="flex gap-1 justify-center mb-1">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-sunset text-lg">
                  {s}
                </span>
              ))}
            </div>
            <div className="text-chrome/60 text-xs tracking-wider uppercase">
              Based on 328 reviews
            </div>
          </div>
          <div className="h-16 w-px bg-sunset/30" />
          <div className="text-center">
            <div className="font-display text-6xl text-sunset leading-none mb-2">
              98.7%
            </div>
            <div className="text-chrome/60 text-xs tracking-wider uppercase">
              お客様満足度
            </div>
          </div>
          <div className="h-16 w-px bg-sunset/30" />
          <div className="text-center">
            <div className="font-display text-6xl text-sunset leading-none mb-2">
              87%
            </div>
            <div className="text-chrome/60 text-xs tracking-wider uppercase">
              リピート率
            </div>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {voices.map((v, idx) => (
            <motion.article
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="clinic-card relative bg-gradient-to-b from-midnight-50/20 to-midnight-100/40 backdrop-blur-sm border border-sunset/20 rounded-2xl p-7 overflow-hidden"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 font-display text-8xl text-sunset/20 leading-none select-none">
                "
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-14 h-14 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome">
                  <span className="font-display text-2xl text-midnight font-bold">
                    {v.initial}
                  </span>
                </div>
                <div>
                  <div className="text-cream font-semibold">{v.name}</div>
                  <div className="text-chrome/60 text-xs">
                    {v.age} · {v.car}
                  </div>
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
              <h3 className="font-display text-xl text-cream mb-3 relative z-10 leading-snug">
                {v.title}
              </h3>

              {/* Body */}
              <p className="text-chrome/70 text-sm leading-relaxed mb-5 relative z-10">
                {v.body}
              </p>

              {/* Treatment tag */}
              <div className="pt-4 border-t border-sunset/10 relative z-10">
                <div className="text-[10px] tracking-wider text-chrome/40 uppercase mb-1">
                  受けた施術
                </div>
                <div className="text-sunset text-sm font-semibold">
                  {v.treatment}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
