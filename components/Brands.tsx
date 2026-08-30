"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Brand } from "@/lib/content";
import type { FaqItem } from "@/components/FaqJsonLd";

/* Curated positioning copy per brand — richer than the thin
   name/region/label fields the admin panel manages, so the page
   reads like real editorial content for both search engines and
   LLM answer engines. Falls back to a generic line for any brand
   added later in the admin panel that isn't in this list yet. */
const BRAND_DESCRIPTIONS: Record<string, string> = {
  "Adam's Polishes":
    "アメリカ発のプレミアムカーケアブランド。世界中のプロディテイラーに支持されるポリッシュ・コーティング・ケミカルを、埼玉県内の正規施工代理店として取り扱っています。",
  FunCruise:
    "埼玉県所沢市発、ガラスコーティング・カーフィルムの専門ブランド。独自開発のコーティング材と丁寧な磨き工程に定評があります。",
  BULLET:
    "埼玉県三芳町を拠点とするカーディテイリング専門ブランド。プロ仕様のポリッシャー・コーティング剤を展開しています。",
  TACSYSTEM:
    "「時短・高撥水」がコンセプトのタッチレスコーティングブランド。手軽さと持続する艶・撥水性能を両立します。",
};
const DEFAULT_BRAND_DESCRIPTION =
  "厳選した信頼できるカーケアブランドとして、施工・販売の両面でお取り扱いしています。";

const PILLARS = [
  {
    num: "01",
    title: "正規品保証",
    text: "並行輸入品ではなく、正規ルートで仕入れた製品のみを使用・販売します。",
  },
  {
    num: "02",
    title: "プロの診断施工",
    text: "車両の塗装状態・使用環境に合わせ、ブランド・製品を選定してご提案します。",
  },
  {
    num: "03",
    title: "埼玉県内対応",
    text: "さいたま市岩槻区を拠点に、岩槻ICから約10分。埼玉県内各地からご来店いただけます。",
  },
];

export default function Brands({
  brands,
  faqs,
}: {
  brands: Brand[];
  faqs: FaqItem[];
}) {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-chrome/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 text-midnight/50 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4">
              <div className="w-8 h-[1px] bg-midnight/30" />
              Brands We Trust
              <div className="w-8 h-[1px] bg-midnight/30" />
            </div>
            <h1 className="font-display text-[1.75rem] md:text-5xl text-midnight mb-6 leading-tight">
              <span className="text-sunset">Adam&apos;s Polishes</span>{" "}
              埼玉 施工代理店
              <br className="hidden sm:block" />
              ほか取扱いブランド
            </h1>
            <p className="text-midnight/70 leading-relaxed max-w-2xl mx-auto font-readable">
              車の美容外科 Car Wash Homies（埼玉県さいたま市岩槻区）は、
              Adam&apos;s Polishesの埼玉施工代理店です。
              FunCruise・BULLET・TACSYSTEMなど、国内外の信頼できるカーケアブランドを厳選し、
              施工・販売の両面でお取り扱いしています。
            </p>
          </motion.div>

          {/* Three pillars */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white border border-midnight/10 rounded-2xl p-6 text-left hover:border-sunset/40 transition-colors"
              >
                <div className="text-[10px] tracking-[0.3em] text-sunset/80 font-pixel mb-2">
                  {p.num}
                </div>
                <div className="font-display text-lg text-midnight mb-2">
                  {p.title}
                </div>
                <p className="text-midnight/60 text-sm leading-relaxed">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BRAND GRID ===================== */}
      <section className="relative py-20 md:py-28 bg-ivory overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-chrome/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-2xl md:text-4xl text-midnight mb-4 leading-tight">
              取扱いブランド<span className="text-sunset">一覧</span>
            </h2>
            <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed font-readable text-sm md:text-base">
              世界中のプロが認めるブランドを厳選し、施工・販売いたします。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {brands.map((brand, idx) => (
              <motion.article
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
                className="bg-white border border-midnight/10 rounded-3xl shadow-clinic p-8 md:p-9 flex flex-col"
              >
                {brand.label && (
                  <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel mb-3">
                    {brand.label}
                  </div>
                )}
                <h3 className="font-display text-2xl md:text-3xl text-midnight mb-2 tracking-tight">
                  {brand.name}
                </h3>
                {brand.region && (
                  <div className="text-midnight/50 text-xs tracking-[0.2em] uppercase mb-4">
                    {brand.region}
                  </div>
                )}
                <p className="text-midnight/70 text-sm leading-relaxed flex-1">
                  {BRAND_DESCRIPTIONS[brand.name] ?? DEFAULT_BRAND_DESCRIPTION}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-midnight/40 uppercase">
              <span className="h-[1px] w-8 bg-midnight/20" />
              and more
              <span className="h-[1px] w-8 bg-midnight/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="relative py-20 md:py-28 bg-cream overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset/[0.04] rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 text-midnight/50 text-[9px] tracking-[0.3em] uppercase font-pixel mb-4">
              <div className="w-8 h-[1px] bg-midnight/30" />
              FAQ
              <div className="w-8 h-[1px] bg-midnight/30" />
            </div>
            <h2 className="font-display text-2xl md:text-4xl text-midnight leading-tight">
              よくあるご質問
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.3) }}
                className="bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic"
              >
                <h3 className="flex items-start gap-3 font-display text-base md:text-lg text-midnight mb-3 leading-snug">
                  <span className="text-sunset shrink-0">Q.</span>
                  {faq.question}
                </h3>
                <p className="flex items-start gap-3 text-midnight/70 text-sm leading-relaxed">
                  <span className="text-midnight/40 font-bold shrink-0">A.</span>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative py-20 md:py-24 bg-midnight overflow-hidden grain">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sunset/[0.08] rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-chrome/70 text-sm mb-6 leading-relaxed">
            Adam&apos;s Polishesをはじめとした取扱いブランドについて、
            お車に合わせた施工・製品選びをご相談いただけます。
          </p>
          <Link href="/reservation" className="btn-90s justify-center !inline-flex">
            <span className="w-2 h-2 rounded-full bg-midnight animate-pulse" />
            無料カウンセリングを予約
            <span>▶</span>
          </Link>
        </div>
      </section>
    </>
  );
}
