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

const coatingServices: Service[] = [
  {
    code: "CT-001",
    name: "ガラスコーティング",
    subtitle: "Glass Coating",
    description:
      "高純度ガラス被膜で塗装面を長期保護。紫外線・酸性雨・鉄粉から愛車を守り、深みのある艶を持続させます。",
    duration: "1日〜",
    price: "お見積り",
    tag: "人気 No.1",
    icon: "💎",
  },
  {
    code: "CT-002",
    name: "セラミックコーティング",
    subtitle: "Ceramic Coating",
    description:
      "最高硬度の被膜形成で傷・汚れに強い圧倒的な防御力。新車の美しさを長期間キープ。",
    duration: "2日〜",
    price: "お見積り",
    icon: "🛡️",
  },
  {
    code: "CT-003",
    name: "磨き・研磨",
    subtitle: "Paint Correction / Polishing",
    description:
      "塗装状態を診断し、年式・使用環境に合わせた最適な研磨。くすみ・小傷・水垢を除去し、塗装本来の輝きを復元。",
    duration: "半日〜",
    price: "お見積り",
    icon: "✨",
  },
  {
    code: "CT-004",
    name: "ヘッドライトリペア",
    subtitle: "Headlight Restoration",
    description:
      "黄ばみ・くすみ・クラックを除去し、ヘッドライトの透明感と明るさを復活させます。",
    duration: "2時間〜",
    price: "お見積り",
    icon: "💡",
  },
];

const washServices: Service[] = [
  {
    code: "WS-001",
    name: "手洗い洗車",
    subtitle: "Hand Wash",
    description:
      "プロの手洗いで傷をつけずに汚れを落とす基本ケア。車両の状態チェック付き。",
    duration: "60分〜",
    price: "お見積り",
    icon: "🧽",
  },
  {
    code: "WS-002",
    name: "室内クリーニング",
    subtitle: "Interior Deep Cleaning",
    description:
      "シート・ダッシュボード・マット等の室内全体を徹底洗浄。革シート保湿・脱臭まで。",
    duration: "2時間〜",
    price: "お見積り",
    icon: "🌿",
  },
  {
    code: "WS-003",
    name: "鉄粉除去",
    subtitle: "Iron Deposit Removal",
    description:
      "塗装面に刺さった鉄粉を除去し、ツルツルの手触りに。コーティング前の下地処理にも。",
    duration: "1時間〜",
    price: "お見積り",
    icon: "🔬",
  },
  {
    code: "WS-004",
    name: "ホイール洗浄",
    subtitle: "Wheel & Rim Cleaning",
    description:
      "ブレーキダスト・油汚れを専用クリーナーで分解除去。クロームの輝きを取り戻します。",
    duration: "30分〜",
    price: "お見積り",
    icon: "💅",
  },
];

function ServiceGrid({
  id,
  label,
  title,
  description,
  services,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
  services: Service[];
}) {
  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden">
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
          <div className="inline-flex items-center gap-3 text-midnight/50 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            {label}
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <p className="text-sm text-midnight/70 leading-relaxed mb-6 min-h-[3rem]">
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
                    料金
                  </div>
                  <div className="font-display text-2xl text-sunset font-bold leading-none">
                    {service.price}
                  </div>
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
          className="mt-12 text-center"
        >
          <p className="text-sm text-midnight/50 italic mb-4">
            ※ 車種・状態により料金が変動します。無料カウンセリングで正確なお見積りをご提示いたします。
          </p>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 text-sunset font-bold hover:gap-4 transition-all"
          >
            ご予約・ご相談はこちら
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function CoatingServices() {
  return (
    <div className="bg-cream">
      <ServiceGrid
        id="coating"
        label="Coating Service"
        title="コーティングサービス"
        description="塗装状態を診断し、車両ごとに最適なコーティングプランをご提案。車の寿命を延ばし、価値を守る施術です。"
        services={coatingServices}
      />
    </div>
  );
}

export function WashServices() {
  return (
    <div className="bg-ivory">
      <ServiceGrid
        id="wash"
        label="Wash Service"
        title="洗車サービス"
        description="プロの手洗いで愛車を傷つけず、汚れだけを的確に除去。定期的なメンテナンスでコーティングの持ちも変わります。"
        services={washServices}
      />
    </div>
  );
}

export default function Services() {
  return (
    <>
      <CoatingServices />
      <WashServices />
    </>
  );
}
