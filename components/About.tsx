"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunset/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-chrome/20 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-midnight/50 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            Our Concept
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-4">
            当院のコンセプト
          </h2>
          <p className="text-midnight/50 text-sm tracking-wide">
            ただのコーティング屋さんじゃない、車の美容外科です。
          </p>
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
              <div className="mt-6 py-5 px-8 border-y border-sunset/30 inline-block">
                <p className="font-display text-xl md:text-2xl text-midnight leading-relaxed">
                  「車の寿命を延ばし、<span className="text-sunset">価値を守る</span>」
                </p>
                <p className="text-midnight/50 text-sm mt-1 tracking-wider">
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

            {/* Three principle pillars */}
            <div className="border-t border-dashed border-midnight/15 pt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "診察",
                  text: "塗装状態・使用環境・年式を丁寧に診断。",
                },
                {
                  num: "02",
                  title: "処方",
                  text: "本当に必要な処置だけをご提案します。",
                },
                {
                  num: "03",
                  title: "施術",
                  text: "車両ごとに最適な施術計画を実行。",
                },
              ].map((p) => (
                <div
                  key={p.num}
                  className="relative bg-white border border-midnight/10 rounded-2xl p-6 hover:border-sunset/40 transition-colors"
                >
                  <div className="text-[10px] tracking-[0.3em] text-sunset/80 font-mono mb-2">
                    {p.num}
                  </div>
                  <div className="font-display text-xl text-midnight mb-2">
                    {p.title}
                  </div>
                  <p className="text-midnight/60 text-sm leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
