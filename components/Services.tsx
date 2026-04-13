"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ============================================================
   BODY COATING — 3-tier clinic menu
   ============================================================ */
type BodyTier = {
  code: string;
  classLabel: string;
  rank: 1 | 2 | 3;
  name: string;
  price: string;
  duration: string;
  features: string[];
  tone: "premium" | "standard" | "basic";
  tag?: string;
};

const bodyCoatings: BodyTier[] = [
  {
    code: "RECON100",
    classLabel: "1st Class",
    rank: 3,
    name: "ボディコーティング",
    price: "198,000円〜",
    duration: "4日〜",
    features: ["長期保護", "高耐久・高光沢", "ダメージ耐性向上"],
    tone: "premium",
    tag: "最高グレード",
  },
  {
    code: "RECON80",
    classLabel: "2nd Class",
    rank: 2,
    name: "ボディコーティング",
    price: "77,000円〜",
    duration: "1〜2日",
    features: ["美観維持・回復", "車両日常使用向け", "耐酸性"],
    tone: "standard",
    tag: "人気",
  },
  {
    code: "RECON50",
    classLabel: "3rd Class",
    rank: 1,
    name: "ボディコーティング",
    price: "33,000円〜77,000円",
    duration: "1〜2日",
    features: [
      "簡易コーティング",
      "1年耐久",
      "メンテナンス次第で持続可能",
    ],
    tone: "basic",
  },
];

/* ============================================================
   INTERIOR / SEAT COATING — pricing table
   ============================================================ */
const interiorCarTypes = ["軽自動車", "小型車", "中型車", "高級車・外車等"];
const interiorPrices = [
  ["17,600円〜", "29,700円〜", "41,800円〜"],
  ["23,100円〜", "35,200円〜", "59,400円〜"],
  ["29,700円〜", "53,900円〜", "83,600円〜"],
  ["35,200円〜", "59,400円〜", "93,500円〜"],
];
const interiorOptions = [
  { label: "3列シート", price: "23,100円〜", note: "※ハイエースなど" },
  { label: "コンビネーションシート", price: "+8,800円〜" },
  { label: "クリーニング", price: "2,200円〜/脚" },
  { label: "ドアトリム（1枚）", price: "7,150円〜" },
  { label: "センターコンソール", price: "5,940円〜" },
  { label: "ハンドル", price: "8,360円〜" },
  {
    label: "車内クリーニング",
    price: "22,000円〜",
    note: "ブロワー・ケミカル洗浄等",
  },
  {
    label: "車内清掃",
    price: "5,500円〜",
    note: "一般的な掃除機・窓拭き・パネル拭き",
  },
];

/* ============================================================
   OTHER COATINGS (glass + wheel)
   ============================================================ */
const glassItems = [
  { label: "フロントガラスのみ", price: "16,500円〜", note: "※サイズが大きい場合＋α" },
  {
    label: "全面",
    price: "33,000円〜",
    note: "※サイズが大きい場合／枚数が多い場合＋α",
  },
];
const wheelItems = [
  {
    title: "お車についている状態",
    rows: [
      { label: "新車 4本", price: "22,000円〜", note: "下地処理あり" },
      { label: "中古 4本", price: "要相談" },
    ],
    note: "※脱着希望の場合は別途",
  },
  {
    title: "ホイール持ち込み（表裏施工）",
    rows: [
      { label: "新品 4本", price: "33,000円〜", note: "下地処理あり" },
      { label: "中古 4本", price: "状態により要相談" },
    ],
  },
];

/* ============================================================
   WASH & MAINTENANCE (real CANVA menu)
   ============================================================ */
type WashService = {
  code: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  note?: string;
  icon: string;
  tag?: string;
};

const washServices: WashService[] = [
  {
    code: "WS-001",
    name: "私の手洗い洗車",
    subtitle: "Signature Hand Wash",
    description:
      "オーナー自ら手がけるこだわりの手洗い洗車。仕上がり・ケア内容ともにフルコース。",
    price: "¥5,500〜",
    note: "※問診にて価格変動のご相談あり",
    icon: "💎",
    tag: "シグネチャー",
  },
  {
    code: "WS-002",
    name: "シンプル手洗い洗車",
    subtitle: "Simple Hand Wash",
    description:
      "日常メンテナンスに最適なシンプル手洗い。プロの手で傷をつけずに丁寧に洗い上げます。",
    price: "¥3,500〜",
    note: "※問診にて価格変動のご相談あり",
    icon: "🧽",
  },
  {
    code: "WS-003",
    name: "ドライブスルー風 100% HAND洗車",
    subtitle: "Drive-Through Style (Rainy Day Only)",
    description:
      "汚れを蓄積させたくない方・窓ガラスの視界を良くしたい方におすすめの、洗いのみコース。",
    price: "¥2,200〜",
    note: "※洗いのみ、拭き上げなし／雨の日限定",
    icon: "🌧️",
    tag: "雨の日限定",
  },
];

/* ============================================================
   B2B (業者様向けご依頼)
   ============================================================ */
const b2bItems = [
  { title: "技術講習依頼", subtitle: "Training" },
  { title: "中古車両仕上げ部門", subtitle: "Car Stylist" },
  { title: "コーティング", subtitle: "Coating" },
  { title: "ルームクリーニング", subtitle: "Interior Cleaning" },
  { title: "ガラス研磨", subtitle: "Glass Polish" },
  { title: "ヘッドライト研磨", subtitle: "Headlight Polish" },
];

/* ============================================================
   SECTION HEADER
   ============================================================ */
function SectionHeader({
  label,
  title,
  description,
  dark = false,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  dark?: boolean;
}) {
  const labelColor = dark ? "text-chrome/50" : "text-midnight/50";
  const lineColor = dark ? "bg-chrome/20" : "bg-midnight/30";
  const titleColor = dark ? "text-cream" : "text-midnight";
  const descColor = dark ? "text-chrome/70" : "text-midnight/60";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-14"
    >
      <div
        className={`inline-flex items-center gap-3 ${labelColor} text-[9px] tracking-[0.3em] uppercase font-pixel mb-4`}
      >
        <div className={`w-8 h-[1px] ${lineColor}`} />
        {label}
        <div className={`w-8 h-[1px] ${lineColor}`} />
      </div>
      <h2
        className={`font-display text-[2rem] md:text-5xl ${titleColor} mb-5 leading-tight`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`${descColor} max-w-2xl mx-auto leading-relaxed text-sm md:text-base font-readable`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ============================================================
   BODY COATING SECTION
   ============================================================ */
function BodyCoatingSection() {
  return (
    <section id="coating" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="absolute inset-0 memphis-dots-sunset opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/[0.05] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-cyan90/[0.08] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          label="Body Coating"
          title={
            <>
              ボディコーティング
              <br className="md:hidden" />
              <span className="text-sunset">料金表</span>
            </>
          }
          description="塗装状態を診断し、車両ごとに最適な液剤を選定。施工前には必ず問診でご説明いたします。"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bodyCoatings.map((tier, idx) => {
            const isPremium = tier.tone === "premium";
            return (
              <motion.article
                key={tier.code}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`clinic-card relative rounded-2xl p-7 overflow-hidden border-2 border-midnight ${
                  isPremium
                    ? "bg-midnight text-cream shadow-retro-pop-sunset"
                    : "bg-white shadow-retro-pop"
                }`}
              >
                {isPremium && (
                  <>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-sunset/20 rounded-full blur-3xl" />
                    <div className="absolute top-0 left-0 right-0 h-1.5 foil" />
                  </>
                )}
                <div className="relative">
                  {/* Header: class + tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div
                        className={`text-[8px] tracking-[0.25em] uppercase font-pixel ${
                          isPremium ? "text-sunset" : "text-midnight/60"
                        }`}
                      >
                        {tier.classLabel}
                      </div>
                      <div
                        className={`text-[10px] tracking-wider uppercase font-crt mt-1.5 leading-none ${
                          isPremium ? "text-chrome/80" : "text-sunset"
                        }`}
                      >
                        {tier.code}
                      </div>
                    </div>
                    {tier.tag && (
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                          isPremium
                            ? "bg-sunset text-midnight"
                            : "bg-midnight text-cream"
                        }`}
                      >
                        {tier.tag}
                      </span>
                    )}
                  </div>

                  {/* Star rank — license-style class indicator */}
                  <div
                    className={`flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-md w-fit ${
                      isPremium
                        ? "bg-sunset/10 border border-sunset/30"
                        : "bg-cream border border-midnight/10"
                    }`}
                  >
                    {[1, 2, 3].map((i) => {
                      const filled = i <= tier.rank;
                      return (
                        <span
                          key={i}
                          className={`text-base leading-none ${
                            filled
                              ? "text-sunset"
                              : isPremium
                                ? "text-chrome/25"
                                : "text-midnight/15"
                          }`}
                        >
                          ★
                        </span>
                      );
                    })}
                    <span
                      className={`ml-2 text-[7px] tracking-[0.2em] uppercase font-pixel ${
                        isPremium ? "text-chrome/80" : "text-midnight/60"
                      }`}
                    >
                      {tier.rank === 3 ? "Triple Star" : tier.rank === 2 ? "Double Star" : "Single Star"}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className={`font-display text-2xl mb-5 leading-tight ${
                      isPremium ? "text-cream" : "text-midnight"
                    }`}
                  >
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div
                    className={`font-crt text-4xl md:text-5xl leading-none mb-1 ${
                      isPremium ? "text-sunset" : "text-midnight"
                    }`}
                  >
                    {tier.price}
                  </div>
                  <div
                    className={`text-[10px] font-pixel uppercase tracking-wider mb-6 ${
                      isPremium ? "text-chrome/70" : "text-midnight/60"
                    }`}
                  >
                    日数 {tier.duration}
                  </div>

                  {/* Divider */}
                  <div
                    className={`border-t border-dashed mb-4 ${
                      isPremium ? "border-chrome/20" : "border-midnight/20"
                    }`}
                  />

                  {/* Features */}
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isPremium ? "bg-sunset" : "bg-sunset"
                          }`}
                        />
                        <span
                          className={
                            isPremium ? "text-chrome/85" : "text-midnight/75"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 text-sm text-midnight/55 leading-relaxed space-y-1.5 max-w-3xl mx-auto"
        >
          <p>※ 全てケミカル洗車・研磨あり</p>
          <p>※ 耐久年数はお客様とのご協力次第になります。環境やメンテナンス状況もご考慮ください。</p>
          <p>※ お車の大きさ・新車／中古、花粉時期や新車時の状態によって内容・金額が変動する場合がございます。</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   INTERIOR COATING SECTION (table)
   ============================================================ */
function InteriorCoatingSection() {
  return (
    <section className="relative py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="absolute top-40 left-0 w-80 h-80 bg-chrome/20 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        <SectionHeader
          label="Interior Coating"
          title={
            <>
              シート・<span className="text-sunset">内装</span>
              <br className="md:hidden" />
              コーティング
            </>
          }
          description="ファブリック・レザーどちらも対応。汚れ・素材に応じて問診で擦り合わせさせていただきます。"
        />

        {/* Main price table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-midnight/10 rounded-3xl shadow-clinic overflow-hidden"
        >
          <div className="bg-midnight px-6 py-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel">
                Price Table
              </div>
              <div className="font-display text-cream text-lg">料金表</div>
            </div>
            <div className="text-[10px] text-chrome/60 tracking-wider uppercase">
              Fabric / Leather
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream/50 border-b-2 border-sunset/20">
                  <th className="text-left py-4 px-4 md:px-6 text-[10px] tracking-wider text-midnight/50 uppercase font-pixel">
                    車種
                  </th>
                  <th className="text-right py-4 px-4 md:px-6 text-[10px] tracking-wider text-midnight/50 uppercase font-pixel">
                    運転席のみ
                  </th>
                  <th className="text-right py-4 px-4 md:px-6 text-[10px] tracking-wider text-midnight/50 uppercase font-pixel">
                    運転席＋助手席
                  </th>
                  <th className="text-right py-4 px-4 md:px-6 text-[10px] tracking-wider text-midnight/50 uppercase font-pixel">
                    前後の場合
                  </th>
                </tr>
              </thead>
              <tbody>
                {interiorCarTypes.map((type, i) => (
                  <tr
                    key={type}
                    className="border-b border-midnight/10 last:border-b-0 hover:bg-cream/40 transition-colors"
                  >
                    <td className="py-4 px-4 md:px-6 font-semibold text-midnight text-sm whitespace-nowrap">
                      {type}
                    </td>
                    {interiorPrices[i].map((p, j) => (
                      <td
                        key={j}
                        className="py-4 px-4 md:px-6 text-right font-crt text-midnight text-lg leading-none whitespace-nowrap"
                      >
                        {p}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 bg-white border border-midnight/10 rounded-3xl shadow-clinic p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel">
              Options
            </div>
            <div className="flex-1 h-[1px] bg-midnight/10" />
            <div className="text-[10px] text-midnight/50 tracking-wider">
              オプション
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {interiorOptions.map((opt) => (
              <div
                key={opt.label}
                className="flex items-start justify-between gap-4 py-2 border-b border-dashed border-midnight/10"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-midnight font-semibold">
                    {opt.label}
                  </div>
                  {opt.note && (
                    <div className="text-[11px] text-midnight/50 mt-0.5">
                      {opt.note}
                    </div>
                  )}
                </div>
                <div className="font-crt text-sunset text-base whitespace-nowrap leading-none">
                  {opt.price}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-midnight/50 italic leading-relaxed">
            ※ 汚れ・素材に応じて金額が前後する場合がございます。事前の問診にてすり合わせさせていただきます。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   OTHER COATINGS SECTION (glass + wheel)
   ============================================================ */
function OtherCoatingSection() {
  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        <SectionHeader
          label="Glass & Wheel Coating"
          title={
            <>
              その他
              <br className="md:hidden" />
              <span className="text-sunset">コーティング</span>
            </>
          }
          description="窓ガラス・ホイールなど、細部まで守る専門メニューです。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Glass */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white border border-midnight/10 rounded-3xl shadow-clinic overflow-hidden"
          >
            <div className="bg-midnight px-6 py-5">
              <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel">
                Glass Coating
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl">🪟</span>
                <span className="font-display text-cream text-xl">
                  窓ガラスコーティング
                </span>
                <span className="text-[10px] text-chrome/60 tracking-wider uppercase border border-chrome/20 rounded-full px-2 py-0.5">
                  1年保証
                </span>
              </div>
            </div>
            <div className="p-6 md:p-7">
              <ul className="divide-y divide-dashed divide-midnight/10">
                {glassItems.map((g) => (
                  <li
                    key={g.label}
                    className="py-3 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-midnight font-semibold">
                        {g.label}
                      </div>
                      <div className="text-[11px] text-midnight/50 mt-0.5">
                        {g.note}
                      </div>
                    </div>
                    <div className="font-crt text-sunset text-xl whitespace-nowrap leading-none">
                      {g.price}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-[11px] text-midnight/50 leading-relaxed space-y-1">
                <p>※ シミや汚れのない新車価格</p>
                <p>※ 1年保証ですが使用頻度や使用状況で変化</p>
                <p>
                  ※ 愛車検証で3年経過後も撥水性能は良好です（2026年2月現在）
                </p>
              </div>
            </div>
          </motion.div>

          {/* Wheel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-midnight/10 rounded-3xl shadow-clinic overflow-hidden"
          >
            <div className="bg-midnight px-6 py-5">
              <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel">
                Wheel Coating
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl">🛞</span>
                <span className="font-display text-cream text-xl">
                  ホイールコーティング
                </span>
              </div>
            </div>
            <div className="p-6 md:p-7 space-y-6">
              {wheelItems.map((w) => (
                <div key={w.title}>
                  <div className="text-[11px] tracking-wider text-sunset uppercase font-pixel mb-3">
                    {w.title}
                  </div>
                  <ul className="divide-y divide-dashed divide-midnight/10">
                    {w.rows.map((r) => (
                      <li
                        key={r.label}
                        className="py-2.5 flex items-start justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-midnight font-semibold">
                            {r.label}
                          </div>
                          {r.note && (
                            <div className="text-[11px] text-midnight/50 mt-0.5">
                              {r.note}
                            </div>
                          )}
                        </div>
                        <div className="font-crt text-sunset text-lg whitespace-nowrap leading-none">
                          {r.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {w.note && (
                    <p className="mt-2 text-[11px] text-midnight/50">
                      {w.note}
                    </p>
                  )}
                </div>
              ))}
              <div className="bg-sunset/10 border border-sunset/30 rounded-xl p-4 text-sm text-midnight/80 leading-relaxed">
                ※ ボディーコーティングとセットがお得になりますので、同時施工をおすすめいたします！
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-midnight/55 mb-4">
            その他のご希望も、お気軽にご相談ください。
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 text-sunset font-bold hover:gap-4 transition-all"
          >
            ご予約・ご相談はこちら
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   WASH & MAINTENANCE SECTION
   ============================================================ */
function WashSection() {
  return (
    <section id="wash" className="relative py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          label="Wash Services"
          title={
            <>
              洗車<span className="text-sunset">サービス</span>
              <br className="md:hidden" />
              紹介
            </>
          }
          description="プロの手洗いで愛車を傷つけず、汚れだけを的確に除去。定期的なメンテナンスでコーティングの持ちも変わります。"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {washServices.map((service, idx) => (
            <motion.article
              key={service.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="clinic-card relative bg-white border border-midnight/10 rounded-2xl p-7 shadow-clinic group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-midnight/40 uppercase font-pixel">
                      {service.code}
                    </div>
                    <div className="text-[10px] tracking-wider text-sunset uppercase font-pixel">
                      {service.subtitle}
                    </div>
                  </div>
                </div>
                {service.tag && (
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-midnight text-cream whitespace-nowrap">
                    {service.tag}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl md:text-2xl text-midnight mb-3 leading-tight group-hover:text-sunset transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-midnight/70 leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              <div className="border-t border-dashed border-midnight/20 mb-4" />
              <div className="flex items-end justify-between">
                <div className="text-[11px] text-midnight/50 leading-relaxed flex-1 pr-3">
                  {service.note}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[9px] font-pixel tracking-wider text-midnight/60 uppercase">
                    料金
                  </div>
                  <div className="font-crt text-3xl text-sunset leading-none mt-1">
                    {service.price}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   B2B SECTION (業者様向けご依頼)
   ============================================================ */
function B2BSection() {
  return (
    <section className="relative py-24 md:py-32 bg-midnight overflow-hidden grain">
      <div className="absolute top-0 left-0 w-96 h-96 bg-sunset/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sunset/[0.05] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        <SectionHeader
          dark
          label="For Business Partners"
          title={
            <>
              業者様向け<span className="text-sunset">ご依頼</span>
            </>
          }
          description="業務提携事例あり。各種技術講習から中古車両仕上げまで、業者様のニーズに合わせて対応いたします。"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-midnight-50/40 border border-sunset/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel px-3 py-1.5 border border-sunset/40 rounded-full">
              業務提携事例あり
            </span>
            <span className="text-[10px] tracking-[0.3em] text-chrome/70 uppercase font-pixel px-3 py-1.5 border border-chrome/20 rounded-full">
              中古車両仕上げ部門（車のスタイリスト）
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {b2bItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-midnight/60 border border-chrome/10 rounded-xl p-5 hover:border-sunset/40 transition-colors"
              >
                <div className="text-[9px] tracking-[0.25em] text-sunset/80 uppercase font-pixel mb-2">
                  {item.subtitle}
                </div>
                <div className="font-display text-cream text-base md:text-lg leading-tight">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 border-y border-sunset/30">
              <span className="w-1.5 h-1.5 rounded-full bg-sunset" />
              <p className="font-display text-lg md:text-xl text-cream tracking-wide">
                選ばれるお車に仕上げるが<span className="text-sunset">モットー</span>です
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-sunset" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   BRANDS SECTION (取り扱い施工・販売ブランド一覧)
   ============================================================ */
function BrandsSection() {
  return (
    <section className="relative py-20 md:py-24 bg-cream overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-chrome/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        <SectionHeader
          label="Brands We Trust"
          title={
            <>
              取り扱い施工・
              <br className="md:hidden" />
              <span className="text-sunset">販売ブランド</span>一覧
            </>
          }
          description="世界中のプロが認めるブランドを厳選し、施工・販売いたします。"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-midnight/10 rounded-3xl shadow-clinic p-10 md:p-14 text-center"
        >
          <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel mb-4">
            Official Dealer
          </div>
          <div className="font-display text-3xl md:text-5xl text-midnight mb-3 tracking-tight">
            Adam&apos;s Polishes
          </div>
          <div className="text-midnight/50 text-sm tracking-[0.2em] uppercase">
            Premium Car Care, USA
          </div>
          <div className="mt-8 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-midnight/40 uppercase">
            <span className="h-[1px] w-8 bg-midnight/20" />
            and more
            <span className="h-[1px] w-8 bg-midnight/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPORTS
   ============================================================ */
export default function Services() {
  return (
    <>
      <BodyCoatingSection />
      <InteriorCoatingSection />
      <OtherCoatingSection />
      <WashSection />
      <B2BSection />
      <BrandsSection />
    </>
  );
}
