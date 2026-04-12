"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const concerns = [
  "塗装のくすみ",
  "水垢・ウォータースポット",
  "鉄粉・ザラつき",
  "細かな傷・線キズ",
  "ホイールの汚れ",
  "室内の匂い",
  "コーティング希望",
  "その他",
];

const treatmentOptions = [
  "CH-001 ベーシック フェイシャル",
  "CH-002 プレミアム美白ケア",
  "CH-003 エイジングケア",
  "CH-004 トータル リフトアップ",
  "CH-005 ネイル & ホイールケア",
  "CH-006 インナービューティ",
  "まだ決めていない（相談したい）",
];

export default function Reservation() {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleConcern = (c: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reservation"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sunset/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sunset/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-sunset text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            <div className="w-8 h-[1px] bg-sunset" />
            Free Counseling
            <div className="w-8 h-[1px] bg-sunset" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6">
            無料カウンセリング
            <br />
            <span className="candy-text">予約フォーム</span>
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            まずはお気軽にご相談ください。愛車の状態を"診察"し、最適な施術プランをご提案します。
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white border border-midnight/10 rounded-3xl shadow-clinic overflow-hidden"
        >
          {/* Clinic header */}
          <div className="bg-midnight px-8 py-6 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-mono mb-1">
                Consultation Form / No. 2025
              </div>
              <div className="font-display text-cream text-xl">
                CarWashHomie カウンセリングカルテ
              </div>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-script text-sunset text-sm">Est. 2010</div>
              <div className="text-chrome/60 text-[10px] tracking-wider uppercase">
                The Auto Aesthetic Clinic
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-sunset-gradient flex items-center justify-center mx-auto mb-6 shadow-chrome">
                  <svg
                    className="w-10 h-10 text-midnight"
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
                </div>
                <h3 className="font-display text-3xl text-midnight mb-3">
                  お申し込みありがとうございます
                </h3>
                <p className="text-midnight/60 leading-relaxed">
                  24時間以内に Dr. ホーミーよりご連絡いたします。
                  <br />
                  愛車の診察をお楽しみに。
                </p>
              </div>
            ) : (
              <>
                {/* Basic info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Field label="お名前" required>
                    <input
                      type="text"
                      required
                      placeholder="山田 太郎"
                      className="input"
                    />
                  </Field>
                  <Field label="フリガナ" required>
                    <input
                      type="text"
                      required
                      placeholder="ヤマダ タロウ"
                      className="input"
                    />
                  </Field>
                  <Field label="電話番号" required>
                    <input
                      type="tel"
                      required
                      placeholder="090-0000-0000"
                      className="input"
                    />
                  </Field>
                  <Field label="メールアドレス" required>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="input"
                    />
                  </Field>
                </div>

                {/* Car info */}
                <div className="border-t border-dashed border-midnight/20 pt-8 mb-8">
                  <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-4">
                    Vehicle Info / 愛車情報
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="車種・年式" required>
                      <input
                        type="text"
                        required
                        placeholder="例: Chevrolet Impala '64"
                        className="input"
                      />
                    </Field>
                    <Field label="ボディカラー">
                      <input
                        type="text"
                        placeholder="例: キャンディオレンジ"
                        className="input"
                      />
                    </Field>
                  </div>
                </div>

                {/* Concerns */}
                <div className="border-t border-dashed border-midnight/20 pt-8 mb-8">
                  <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-4">
                    Concerns / お悩み（複数選択可）
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {concerns.map((c) => {
                      const selected = selectedConcerns.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleConcern(c)}
                          className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                            selected
                              ? "bg-sunset-gradient border-sunset text-midnight font-bold shadow-chrome"
                              : "border-midnight/20 text-midnight/60 hover:border-sunset hover:text-sunset"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desired treatment */}
                <div className="border-t border-dashed border-midnight/20 pt-8 mb-8">
                  <Field label="ご希望の施術">
                    <select className="input" defaultValue="">
                      <option value="" disabled>
                        施術を選択してください
                      </option>
                      {treatmentOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Note */}
                <div className="mb-8">
                  <Field label="追加メッセージ">
                    <textarea
                      rows={4}
                      placeholder="ご希望日時や、詳しいお悩みなどご自由にお書きください。"
                      className="input resize-none"
                    />
                  </Field>
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-sunset-gradient text-midnight font-bold text-lg shadow-chrome hover:shadow-sunset-glow transition-all hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-midnight animate-pulse" />
                    無料カウンセリングを予約する
                    <svg
                      className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                  <p className="text-xs text-midnight/50 italic">
                    ※ 24時間以内に Dr. ホーミーよりご連絡いたします。
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid rgba(26, 15, 8, 0.15);
          border-radius: 0.75rem;
          background: #fff8f0;
          color: #1a0f08;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }
        .input:focus {
          border-color: #ff6b1a;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255, 107, 26, 0.1);
        }
        .input::placeholder {
          color: rgba(26, 15, 8, 0.35);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-midnight/70 mb-2 tracking-wider uppercase">
        {label}
        {required && <span className="text-sunset ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
