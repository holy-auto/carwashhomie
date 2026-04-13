"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-sunset text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-sunset" />
            Company
            <div className="w-8 h-[1px] bg-sunset" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6">
            会社概要
          </h2>
        </motion.div>

        {/* Clinic-style info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-midnight/10 rounded-3xl shadow-clinic overflow-hidden"
        >
          {/* Card header */}
          <div className="bg-midnight px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Car Wash Homies"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-md"
              />
              <div>
                <div className="font-display text-cream text-lg">
                  車の美容外科
                </div>
                <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-mono">
                  Car Wash Homies
                </div>
              </div>
            </div>
            <div className="hidden md:block text-right text-[10px] text-chrome/60 tracking-wider uppercase">
              Established 2025
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Concept */}
            <div className="text-center mb-10">
              <h3 className="font-display text-2xl md:text-3xl text-midnight mb-6">
                当院の方針（コンセプト）
              </h3>
              <p className="text-midnight/70 leading-relaxed max-w-2xl mx-auto">
                塗装状態・使用環境・年式を診断し、
                <br className="hidden md:block" />
                本当に必要な処置を選択をご提供します。
                <br />
                車両ごとに最適な施術計画をご提案します。
              </p>
              <div className="mt-6 py-4 px-6 bg-sunset/5 border border-sunset/20 rounded-xl inline-block">
                <p className="font-display text-xl md:text-2xl text-midnight leading-relaxed">
                  「車の寿命を延ばし、<span className="text-sunset">価値を守る</span>」
                </p>
                <p className="text-midnight/60 text-sm mt-1">
                  それが当院のポリシーです。
                </p>
              </div>
              <p className="text-midnight/60 text-sm mt-6 leading-relaxed max-w-lg mx-auto">
                車の美容外科として
                お値段やニーズな合わせて
                車のスタイリストとしても
                お気軽にご相談ください。
              </p>
            </div>

            {/* Info table */}
            <div className="border-t border-dashed border-midnight/20 pt-8">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "院名", value: "車の美容外科 Car Wash Homies" },
                    {
                      label: "院長（代表者）",
                      value: "中山 春香（二級自動車整備士）",
                    },
                    {
                      label: "所在地",
                      value:
                        "〒339-0021 埼玉県さいたま市岩槻区末田2421-2",
                    },
                    { label: "登録番号", value: "T8810011150208" },
                    { label: "電話番号", value: "048-606-4977" },
                    { label: "営業時間", value: "10:00 — 19:00" },
                    { label: "定休日", value: "不定休" },
                    { label: "開業", value: "2026年4月15日" },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-midnight/10 last:border-b-0"
                    >
                      <th className="text-left py-3 pr-6 text-sunset font-semibold text-xs tracking-wider uppercase w-36 md:w-48 align-top">
                        {row.label}
                      </th>
                      <td className="py-3 text-midnight/80">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
