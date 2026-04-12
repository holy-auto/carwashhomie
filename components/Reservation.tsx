"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const concerns = [
  "塗装のくすみ",
  "水垢・ウォータースポット",
  "鉄粉・ザラつき",
  "細かな傷・線キズ",
  "ホイールの汚れ",
  "室内の匂い・汚れ",
  "コーティング希望",
  "ヘッドライト黄ばみ",
  "その他",
];

const treatmentOptions = [
  "ガラスコーティング",
  "セラミックコーティング",
  "磨き・研磨",
  "ヘッドライトリペア",
  "手洗い洗車",
  "室内クリーニング",
  "鉄粉除去",
  "ホイール洗浄",
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
            Reservation
            <div className="w-8 h-[1px] bg-sunset" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-midnight mb-6">
            ご予約・
            <span className="candy-text">ご相談</span>
          </h2>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            お気軽にご相談ください。愛車の状態を診察し、最適な施術プランをご提案します。
            <br className="hidden md:block" />
            無料カウンセリング実施中（車両状態確認・施術提案）
          </p>
        </motion.div>

        {/* Contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <a
            href="tel:0486064977"
            className="clinic-card flex items-center gap-4 bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic group"
          >
            <div className="w-14 h-14 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome shrink-0 group-hover:animate-hydraulic-bounce">
              <svg
                className="w-6 h-6 text-midnight"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] tracking-wider text-midnight/50 uppercase mb-0.5">
                お電話
              </div>
              <div className="font-display text-xl text-sunset font-bold">
                048-606-4977
              </div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/japanese_detailer_girl/"
            target="_blank"
            rel="noopener noreferrer"
            className="clinic-card flex items-center gap-4 bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic group"
          >
            <div className="w-14 h-14 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome shrink-0 group-hover:animate-hydraulic-bounce">
              <svg
                className="w-6 h-6 text-midnight"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] tracking-wider text-midnight/50 uppercase mb-0.5">
                Instagram DM
              </div>
              <div className="font-display text-lg text-sunset font-bold">
                @japanese_detailer_girl
              </div>
            </div>
          </a>

          <div className="clinic-card flex items-center gap-4 bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic">
            <div className="w-14 h-14 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome shrink-0">
              <svg
                className="w-6 h-6 text-midnight"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] tracking-wider text-midnight/50 uppercase mb-0.5">
                お問い合わせフォーム
              </div>
              <div className="text-midnight font-semibold text-sm">
                下記フォームからどうぞ
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
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
                Consultation Form
              </div>
              <div className="font-display text-cream text-xl">
                お問い合わせフォーム
              </div>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-sunset text-sm font-semibold">
                無料カウンセリング実施中
              </div>
              <div className="text-chrome/60 text-[10px] tracking-wider">
                車両状態確認・施術提案
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
                  お問い合わせありがとうございます
                </h3>
                <p className="text-midnight/60 leading-relaxed">
                  内容を確認の上、折り返しご連絡いたします。
                  <br />
                  お急ぎの方はお電話（048-606-4977）またはInstagram DMでもご連絡ください。
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
                        placeholder="例: トヨタ アルファード 2022年式"
                        className="input"
                      />
                    </Field>
                    <Field label="ボディカラー">
                      <input
                        type="text"
                        placeholder="例: ブラック"
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
                  <Field label="ご相談内容・ご希望日時">
                    <textarea
                      rows={4}
                      placeholder="ご希望日時や、詳しいお悩みなどご自由にお書きください。業者様向けのご依頼もこちらからどうぞ。"
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
                    送信する
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
                    ※ お急ぎの方はお電話（048-606-4977）またはInstagram DMでもお気軽にどうぞ。
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
