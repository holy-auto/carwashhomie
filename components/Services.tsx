"use client";

import { motion } from "framer-motion";

type Service = {
  code: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  tag?: string;
  icon: string;
};

const services: Service[] = [
  {
    code: "CH-001",
    name: "ベーシック フェイシャル",
    subtitle: "Basic Facial Treatment",
    description:
      "手洗い洗車 + 簡易ワックス。日常のくすみを落とし、本来のツヤを取り戻す基本ケア。",
    duration: "60分",
    price: "¥3,980",
    icon: "✨",
  },
  {
    code: "CH-002",
    name: "プレミアム美白ケア",
    subtitle: "Premium Whitening Coating",
    description:
      "高純度ガラスコーティングで紫外線・酸性雨から長期保護。艶感とハリが数段アップ。",
    duration: "3時間",
    price: "¥29,800",
    tag: "人気 No.1",
    icon: "💎",
  },
  {
    code: "CH-003",
    name: "エイジングケア",
    subtitle: "Anti-Aging Full Restoration",
    description:
      "鉄粉除去・ウォータースポット除去・軽度の傷消し磨き。年式を感じさせない若々しいボディに。",
    duration: "5時間",
    price: "¥49,800",
    icon: "🔥",
  },
  {
    code: "CH-004",
    name: "トータル リフトアップ",
    subtitle: "Total Detailing & Lift",
    description:
      "完全手磨きによるフルディテーリング。塗装の奥からくすみを取り除く最上級施術。",
    duration: "1日",
    price: "¥98,000",
    tag: "LIMITED",
    icon: "👑",
  },
  {
    code: "CH-005",
    name: "ネイル & ホイールケア",
    subtitle: "Rim Polish Treatment",
    description:
      "ホイール専用洗浄 + ブレーキダスト除去 + クロームポリッシュ。足元の印象を格上げ。",
    duration: "90分",
    price: "¥12,800",
    icon: "💅",
  },
  {
    code: "CH-006",
    name: "インナービューティ",
    subtitle: "Interior Deep Cleansing",
    description:
      "室内クリーニング・革シート保湿・脱臭施術。見えない部分までホーミー仕上げ。",
    duration: "2時間",
    price: "¥18,800",
    icon: "🌿",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      {/* Background decorative orange */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunset/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-sunset text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-sunset" />
            Treatment Menu
            <div className="w-8 h-[1px] bg-sunset" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6 leading-tight">
            施術メニュー
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            美容クリニックと同じ思想で、愛車の"お悩み"に合わせた施術プランをご提案します。
            <br className="hidden md:block" />
            初回は必ず無料カウンセリングから。
          </p>
        </motion.div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.article
              key={service.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="clinic-card relative bg-white border border-midnight/10 rounded-2xl p-7 shadow-clinic group"
            >
              {/* Code / Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-midnight/40 uppercase font-mono">
                      {service.code}
                    </div>
                    <div className="text-[10px] tracking-wider text-sunset uppercase font-semibold">
                      {service.subtitle}
                    </div>
                  </div>
                </div>
                {service.tag && (
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-sunset text-cream">
                    {service.tag}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="font-display text-2xl text-midnight mb-3 leading-tight group-hover:text-sunset transition-colors">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-midnight/70 leading-relaxed mb-6 min-h-[4.5rem]">
                {service.description}
              </p>

              {/* Divider */}
              <div className="border-t border-dashed border-midnight/20 mb-4" />

              {/* Duration & Price */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-wider text-midnight/40 uppercase">
                    所要時間
                  </div>
                  <div className="text-sm text-midnight font-semibold">
                    {service.duration}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] tracking-wider text-midnight/40 uppercase">
                    料金（税込）
                  </div>
                  <div className="font-display text-3xl text-sunset font-bold leading-none">
                    {service.price}
                  </div>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                <div className="w-8 h-8 rounded-full bg-sunset flex items-center justify-center text-cream">
                  →
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-midnight/50 italic mb-4">
            ※ 車種・状態により料金が変動する場合があります。事前カウンセリングで正確なお見積りをご提示いたします。
          </p>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 text-sunset font-bold hover:gap-4 transition-all"
          >
            無料カウンセリング予約はこちら
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
