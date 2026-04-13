"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  {
    num: "01",
    title: "個人情報の取得",
    body: "当院は、ご予約・ご相談・お問い合わせ・施術記録の管理にあたり、必要な範囲で個人情報を取得します。具体的には、お名前、電話番号、メールアドレス、ご住所、車両情報（車種・年式・登録番号など）、ご相談内容、施術内容、決済情報などを取得します。",
  },
  {
    num: "02",
    title: "利用目的",
    body: "取得した個人情報は以下の目的にのみ利用します。\n（1）ご予約・ご相談への対応および連絡\n（2）施術計画の策定および施術記録の管理\n（3）施術後のアフターフォロー・再入院のご案内\n（4）お支払いおよび領収・請求事務\n（5）当院からの各種ご案内（ご希望の場合のみ）\n（6）法令に基づく対応",
  },
  {
    num: "03",
    title: "第三者提供",
    body: "当院は、以下の場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。\n（1）法令に基づく場合\n（2）人の生命・身体・財産の保護のために必要がある場合\n（3）公衆衛生・児童の健全育成推進のために必要がある場合\n（4）国の機関もしくは地方公共団体等への協力が必要な場合",
  },
  {
    num: "04",
    title: "安全管理措置",
    body: "個人情報への不正アクセス・紛失・改ざん・漏えいを防止するため、施錠保管・アクセス制限・スタッフへの教育など、合理的な安全管理措置を講じます。",
  },
  {
    num: "05",
    title: "開示・訂正・利用停止",
    body: "ご本人から個人情報の開示・訂正・追加・削除・利用停止のご請求があった場合は、ご本人であることを確認のうえ、法令に従い速やかに対応します。",
  },
  {
    num: "06",
    title: "Cookie・アクセス解析",
    body: "当サイトではサービス改善のためにCookieやアクセス解析ツールを利用する場合があります。これらにより個人を特定する情報は取得しません。ブラウザ設定によりCookieの利用を拒否することも可能です。",
  },
  {
    num: "07",
    title: "お問い合わせ",
    body: "個人情報の取り扱いに関するお問い合わせは、下記の窓口までご連絡ください。\n車の美容外科 Car Wash Homies\n〒339-0021 埼玉県さいたま市岩槻区末田2421-2\nTEL：048-606-4977\nInstagram：@japanese_detailer_girl",
  },
  {
    num: "08",
    title: "改定",
    body: "本プライバシーポリシーは、法令の改正や運用の見直しに応じて、予告なく変更することがあります。最新版は本ページに掲載します。",
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-chrome/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-midnight/50 text-xs tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            Privacy Policy
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-midnight mb-4 leading-tight">
            プライバシーポリシー
          </h1>
          <p className="text-midnight/60 text-sm tracking-wide font-readable leading-relaxed max-w-2xl mx-auto">
            車の美容外科 Car Wash Homies（以下「当院」）は、
            ご来院いただくすべての皆さまの個人情報を適切に取り扱うため、
            以下のとおりプライバシーポリシーを定めます。
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {sections.map((s) => (
            <div
              key={s.num}
              className="relative bg-white border border-midnight/10 rounded-2xl p-6 md:p-8 hover:border-sunset/40 transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-[10px] tracking-[0.3em] text-sunset/80 font-pixel">
                  {s.num}
                </span>
                <h2 className="font-display text-xl md:text-2xl text-midnight">
                  {s.title}
                </h2>
              </div>
              <p className="text-midnight/75 leading-relaxed whitespace-pre-line font-readable text-sm md:text-base">
                {s.body}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Meta + nav */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 pt-8 border-t border-dashed border-midnight/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase font-pixel text-midnight/50"
        >
          <span>制定日：2026年4月15日</span>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="hover:text-sunset transition-colors">
              特定商取引法
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-midnight/20 hover:border-sunset hover:text-sunset transition-all"
            >
              ← トップへ戻る
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
