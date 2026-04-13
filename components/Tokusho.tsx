"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";

const rows = [
  {
    label: "販売事業者名",
    value: BUSINESS.nameJa,
  },
  {
    label: "運営責任者",
    value: `${BUSINESS.operator}（${BUSINESS.operatorTitle}）`,
  },
  {
    label: "所在地",
    value: `〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`,
  },
  {
    label: "電話番号",
    value: BUSINESS.phone,
  },
  {
    label: "お問い合わせ",
    value: `お電話（${BUSINESS.phone}）／ Instagram DM（@${BUSINESS.instagramHandle}）／ X DM（@${BUSINESS.xHandle}）`,
  },
  {
    label: "営業時間",
    value: BUSINESS.hours,
  },
  {
    label: "定休日",
    value: BUSINESS.hoursNote,
  },
  {
    label: "登録番号",
    value: BUSINESS.registrationNumber,
  },
  {
    label: "販売価格",
    value:
      "各施術メニューに記載の金額（別途消費税）。車両状態により追加料金が発生する場合は、事前に診断結果とあわせてお見積もりをお伝えします。",
  },
  {
    label: "商品代金以外の必要料金",
    value:
      "出張施工をご依頼の場合の出張費、および遠方のお客様の場合の交通費実費。事前にお見積もりをご提示します。",
  },
  {
    label: "お支払い方法",
    value: "現金 / 銀行振込 / 各種キャッシュレス決済",
  },
  {
    label: "お支払い時期",
    value: "施術完了後、店頭にてお支払いください。銀行振込の場合は請求書発行後7日以内にお支払いください。",
  },
  {
    label: "役務の提供時期",
    value:
      "ご予約日時に店頭にて施術を実施します。内容・車両状態により所要時間が前後する場合があります。",
  },
  {
    label: "キャンセル・変更について",
    value:
      "ご予約日の前日までにお電話またはDMでご連絡ください。当日キャンセルの場合、キャンセル料を申し受ける場合があります。",
  },
  {
    label: "返品・返金について",
    value:
      "役務（施術サービス）の性質上、施術完了後のご返金は承っておりません。万が一、仕上がりにご不明点がある場合は施術後7日以内にご連絡ください。再施術等の対応をさせていただきます。",
  },
];

export default function Tokusho() {
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
            Commercial Transactions Act
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-midnight mb-4 leading-tight">
            特定商取引法に基づく表記
          </h1>
          <p className="text-midnight/60 text-sm tracking-wide font-readable leading-relaxed max-w-2xl mx-auto">
            「特定商取引に関する法律」第11条に基づき、下記のとおり表示します。
          </p>
        </motion.div>

        {/* Info table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-midnight/10 rounded-2xl overflow-hidden shadow-clinic"
        >
          <dl className="grid grid-cols-1 md:grid-cols-[12rem_1fr]">
            {rows.map((row, i) => (
              <div key={row.label} className="contents">
                <dt
                  className={`py-4 px-6 text-sunset font-semibold text-[11px] tracking-[0.2em] uppercase font-pixel bg-sunset/[0.04] md:border-b md:border-midnight/10 ${
                    i === rows.length - 1 ? "md:border-b-0" : ""
                  }`}
                >
                  {row.label}
                </dt>
                <dd
                  className={`py-4 px-6 text-midnight/80 text-sm md:text-base leading-relaxed border-b border-midnight/10 font-readable ${
                    i === rows.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Meta + nav */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 pt-8 border-t border-dashed border-midnight/20 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase font-pixel text-midnight/50"
        >
          <span>最終更新日：2026年4月15日</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-sunset transition-colors">
              プライバシーポリシー
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
