"use client";

import { motion } from "framer-motion";
import { cloneElement, isValidElement, useState } from "react";
import type { ReactElement } from "react";
import { BUSINESS } from "@/lib/constants";

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /* Remember the last constructed mailto link so the error UI can
     offer it as a fallback if the Web3Forms POST failed. */
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const toggleConcern = (c: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  /* Submit handler — POSTs JSON to our own /api/contact route,
     which then relays the inquiry to BUSINESS.email via the
     Resend API. No third-party script runs in the browser, no
     mailer pops up; success or error is surfaced inline.

     If the POST fails (missing RESEND_API_KEY, network error,
     Resend returns non-2xx), we surface the error and offer a
     mailto: fallback so the inquiry can always get through. */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const fd = new FormData(e.currentTarget);

    // Honeypot — silently "succeed" for bots that fill it.
    if ((fd.get("botcheck") as string | null)?.trim()) {
      setSubmitted(true);
      return;
    }

    const get = (k: string) => ((fd.get(k) as string | null) ?? "").trim();
    const name = get("name");
    const nameKana = get("name-kana");
    const tel = get("tel");
    const email = get("email");
    const vehicle = get("vehicle");
    const bodyColor = get("body-color");
    const treatment = get("treatment");
    const note = get("note");

    // Precompute a mailto: fallback so the error UI can offer a
    // one-tap alternative path if the API call fails.
    const subject = `【お問い合わせ】${name || "名前未入力"} 様 / ${
      vehicle || "車種未入力"
    }`;
    const mailtoBody = [
      "車の美容外科 Car Wash Homies お問い合わせフォーム",
      "─────────────────────",
      `お名前     : ${name}`,
      `フリガナ   : ${nameKana}`,
      `電話番号   : ${tel}`,
      `メール     : ${email}`,
      "",
      "── 愛車情報 ──",
      `車種・年式 : ${vehicle}`,
      `カラー     : ${bodyColor || "（未入力）"}`,
      "",
      "── お悩み ──",
      selectedConcerns.length
        ? selectedConcerns.map((c) => `・${c}`).join("\n")
        : "（未選択）",
      "",
      "── ご希望の施術 ──",
      treatment || "（未選択）",
      "",
      "── ご相談内容・ご希望日時 ──",
      note || "（未入力）",
    ].join("\n");
    setFallbackMailto(
      `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(mailtoBody)}`,
    );

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          nameKana,
          tel,
          email,
          vehicle,
          bodyColor,
          treatment,
          concerns: selectedConcerns,
          note,
          botcheck: "",
        }),
      });
      const result: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !result.ok) {
        throw new Error(
          result.error || "送信に失敗しました。時間をおいて再度お試しください。",
        );
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "通信に失敗しました。ネットワーク状態をご確認ください。",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="reservation"
      className="relative py-24 md:py-32 bg-cream overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sunset/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-midnight/50 text-xs tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-midnight/30" />
            Reservation
            <div className="w-8 h-[1px] bg-midnight/30" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-midnight mb-4 leading-tight">
            ご予約<span className="text-sunset">・</span>ご相談
          </h1>
          <p className="text-midnight/60 max-w-2xl mx-auto leading-relaxed font-readable">
            お気軽にご相談ください。
            <br className="md:hidden" />
            愛車の状態を診察し、最適な施術プランをご提案します。
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
            href={`tel:${BUSINESS.phoneTel}`}
            aria-label={`電話 ${BUSINESS.phone}`}
            className="clinic-card flex items-center gap-4 bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic group"
          >
            <div className="w-14 h-14 rounded-full bg-midnight flex items-center justify-center shadow-clinic shrink-0 group-hover:animate-hydraulic-bounce">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-sunset"
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
              <div className="text-[8px] tracking-[0.2em] text-cyan90/80 uppercase mb-1 font-pixel">
                お電話
              </div>
              <div className="font-crt text-3xl text-sunset leading-none">
                {BUSINESS.phone}
              </div>
            </div>
          </a>

          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram @${BUSINESS.instagramHandle} で DM`}
            className="clinic-card flex items-center gap-4 bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic group min-w-0"
          >
            <div className="w-14 h-14 rounded-full bg-midnight flex items-center justify-center shadow-clinic shrink-0 group-hover:animate-hydraulic-bounce">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-sunset"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[8px] tracking-[0.2em] text-cyan90/80 uppercase mb-1 font-pixel">
                Instagram DM
              </div>
              <div className="font-display text-midnight text-xs md:text-sm font-semibold break-all leading-snug">
                @{BUSINESS.instagramHandle}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${BUSINESS.email}`}
            aria-label={`メール ${BUSINESS.email}`}
            className="clinic-card flex items-center gap-4 bg-white border border-midnight/10 rounded-2xl p-6 shadow-clinic group min-w-0"
          >
            <div className="w-14 h-14 rounded-full bg-midnight flex items-center justify-center shadow-clinic shrink-0 group-hover:animate-hydraulic-bounce">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-sunset"
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
            <div className="min-w-0 flex-1">
              <div className="text-[8px] tracking-[0.2em] text-cyan90/80 uppercase mb-1 font-pixel">
                Email
              </div>
              <div className="font-display text-midnight text-xs md:text-sm font-semibold break-all leading-snug">
                {BUSINESS.email}
              </div>
            </div>
          </a>
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
              <div className="text-[10px] tracking-[0.3em] text-sunset uppercase font-pixel mb-1">
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
                    aria-hidden="true"
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
                <h3 className="font-display text-xl md:text-3xl text-midnight mb-3 leading-tight">
                  お問い合わせを
                  <br className="md:hidden" />
                  送信しました
                </h3>
                <p className="text-midnight/60 leading-relaxed font-readable">
                  内容を確認の上、折り返しご連絡いたします。
                  <br />
                  お急ぎの方はお電話（{BUSINESS.phone}）または
                  <br className="md:hidden" />
                  Instagram DMでもご連絡ください。
                </p>
              </div>
            ) : (
              <>
                {/* Honeypot — hidden from real users but visible to
                    naive spam bots. Handler silently discards any
                    submission where this is filled. Web3Forms uses
                    `botcheck` as its conventional honeypot name. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label>
                    Please leave this field empty
                    <input
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                {/* Basic info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Field name="name" label="お名前" required autoComplete="name">
                    <input type="text" required placeholder="山田 太郎" className="input" />
                  </Field>
                  <Field
                    name="name-kana"
                    label="フリガナ"
                    required
                    autoComplete="off"
                  >
                    <input type="text" required placeholder="ヤマダ タロウ" className="input" />
                  </Field>
                  <Field name="tel" label="電話番号" required autoComplete="tel">
                    <input
                      type="tel"
                      required
                      placeholder="090-0000-0000"
                      className="input"
                    />
                  </Field>
                  <Field name="email" label="メールアドレス" required autoComplete="email">
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
                  <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-pixel mb-4">
                    Vehicle Info / 愛車情報
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field name="vehicle" label="車種・年式" required>
                      <input
                        type="text"
                        required
                        placeholder="例: トヨタ アルファード 2022年式"
                        className="input"
                      />
                    </Field>
                    <Field name="body-color" label="ボディカラー">
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
                  <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-pixel mb-4">
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
                  <Field name="treatment" label="ご希望の施術">
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
                  <Field name="note" label="ご相談内容・ご希望日時">
                    <textarea
                      rows={4}
                      placeholder="ご希望日時や、詳しいお悩みなどご自由にお書きください。業者様向けのご依頼もこちらからどうぞ。"
                      className="input resize-none"
                    />
                  </Field>
                </div>

                {/* Inline error banner with mailto fallback */}
                {error && (
                  <div
                    role="alert"
                    className="mb-6 rounded-xl border-2 border-magenta bg-magenta/10 p-4 text-sm text-midnight"
                  >
                    <div className="font-bold text-magenta mb-2">
                      送信に失敗しました
                    </div>
                    <p className="text-midnight/80 leading-relaxed mb-3">
                      {error}
                    </p>
                    {fallbackMailto && (
                      <a
                        href={fallbackMailto}
                        className="inline-flex items-center gap-2 text-sunset font-semibold underline"
                      >
                        メーラーを起動して送信する
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-90s group !text-base !px-8 !py-4 disabled:opacity-60 disabled:cursor-wait"
                  >
                    {sending ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full border-2 border-midnight border-t-transparent animate-spin"
                        />
                        送信中...
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-midnight animate-pulse" />
                        送信する
                        <svg
                          aria-hidden="true"
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
                      </>
                    )}
                  </button>
                  <p className="text-xs text-midnight/50 italic">
                    ※ お急ぎの方はお電話（{BUSINESS.phone}）またはInstagram DMでもお気軽にどうぞ。
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
          padding: 0.75rem 1rem;
          border: 2px solid #1a0f08;
          border-radius: 0.5rem;
          background: #fff8f0;
          color: #1a0f08;
          font-family: var(--font-crt), monospace;
          font-size: 1.1rem;
          line-height: 1.2;
          transition: all 0.15s;
          outline: none;
          box-shadow: 3px 3px 0 0 #1a0f08;
        }
        .input:focus {
          border-color: #ff2e97;
          background: #ffffff;
          box-shadow: 4px 4px 0 0 #ff2e97;
          transform: translate(-1px, -1px);
        }
        .input::placeholder {
          color: rgba(26, 15, 8, 0.35);
          font-family: var(--font-pixel), monospace;
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
}

/* Form field wrapper — renders an explicit `<label htmlFor>` and
   injects `id` / `name` / `autoComplete` onto its single child
   input/select/textarea so assistive tech + browser autofill both
   work without consumers having to wire those attrs each time. */
function Field({
  name,
  label,
  required,
  autoComplete,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  children: ReactElement<{
    id?: string;
    name?: string;
    required?: boolean;
    autoComplete?: string;
    "aria-required"?: boolean;
  }>;
}) {
  const id = `rsv-${name}`;
  const enhanced = isValidElement(children)
    ? cloneElement(children, {
        id,
        name,
        required,
        autoComplete,
        "aria-required": required,
      })
    : children;

  return (
    <div className="block">
      <label
        htmlFor={id}
        className="block text-[9px] font-pixel text-midnight/70 mb-2 tracking-wider uppercase"
      >
        {label}
        {required && (
          <span className="text-magenta ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {enhanced}
    </div>
  );
}
