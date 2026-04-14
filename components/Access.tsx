"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";

const info = [
  {
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "所在地",
    value: "〒339-0021 埼玉県さいたま市岩槻区末田2421-2",
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "営業時間",
    value: "10:00 — 19:00",
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "定休日",
    value: "不定休",
  },
  {
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "電話番号",
    value: BUSINESS.phone,
  },
];

const access = [
  {
    method: "車",
    icon: "🚗",
    routes: [
      "東北自動車道「岩槻IC」より約10分",
      "店舗前に駐車スペースあり（大型車OK）",
    ],
  },
  {
    method: "電車",
    icon: "🚃",
    routes: [
      "東武アーバンパークライン「岩槻駅」よりお車で約10分",
    ],
  },
];

export default function Access() {
  return (
    <section
      id="access"
      className="relative py-24 md:py-32 bg-midnight overflow-hidden grain"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-sunset/[0.06] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-chrome/50 text-xs tracking-[0.3em] uppercase font-pixel mb-4">
            <div className="w-8 h-[1px] bg-chrome/20" />
            Access & Map
            <div className="w-8 h-[1px] bg-chrome/20" />
          </div>
          <h1 className="font-display text-[2rem] md:text-5xl text-cream mb-6 leading-tight">
            アクセス
          </h1>
          <p className="text-chrome/70 max-w-2xl mx-auto leading-relaxed font-readable">
            愛車を連れて、お気軽にご来院ください。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden border border-sunset/20 shadow-clinic">
              <div className="aspect-[4/3] lg:aspect-[16/10]">
                <iframe
                  /* Use the full postal address as the query so Google
                     geocodes the exact storefront every time.
                     Hardcoded lat/lng previously pointed slightly off
                     the actual location. `output=embed` gives us a
                     no-API-key iframe; `hl=ja` keeps Japanese UI. */
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`,
                  )}&hl=ja&z=17&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="車の美容外科 Car Wash Homies アクセスマップ"
                  className="w-full h-full"
                />
              </div>

              {/* Map overlay label */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-midnight/80 border border-sunset/30 backdrop-blur-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sunset animate-pulse" />
                <span className="text-sunset text-xs font-bold tracking-wider">
                  車の美容外科 Car Wash Homies
                </span>
              </div>
            </div>

            {/* Parking note */}
            <div className="mt-4 flex items-center gap-3 px-5 py-3 rounded-xl bg-sunset/10 border border-sunset/20">
              <span className="text-2xl">🅿️</span>
              <div>
                <div className="text-cream text-sm font-semibold">
                  駐車スペース完備
                </div>
                <div className="text-chrome/60 text-xs">
                  大型車OK。店舗前にございます。
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Basic info cards */}
            <div className="bg-midnight-50/30 border border-sunset/20 rounded-2xl p-6 space-y-5">
              <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-pixel">
                Clinic Info
              </div>
              {info.map((item) => {
                const isPhone = item.label === "電話番号";
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sunset/10 flex items-center justify-center text-sunset shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[8px] tracking-[0.2em] text-cyan90/80 uppercase mb-1 font-pixel">
                        {item.label}
                      </div>
                      <div
                        className={
                          isPhone
                            ? "font-crt text-sunset text-2xl leading-none"
                            : "text-cream text-sm leading-relaxed"
                        }
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Access routes */}
            <div className="bg-midnight-50/30 border border-sunset/20 rounded-2xl p-6 space-y-5">
              <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-pixel">
                交通手段
              </div>
              {access.map((a) => (
                <div key={a.method}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{a.icon}</span>
                    <span className="text-cream text-sm font-bold">
                      {a.method}でお越しの場合
                    </span>
                  </div>
                  <ul className="space-y-1.5 ml-8">
                    {a.routes.map((r) => (
                      <li
                        key={r}
                        className="text-chrome/70 text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sunset shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-sunset-gradient text-midnight font-bold shadow-chrome hover:shadow-sunset-glow transition-all hover:scale-105"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Google Maps で経路を見る
              <svg
                aria-hidden="true"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
            </a>
          </motion.div>
        </div>

        {/* Company details (at the very end) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 border-t border-chrome/10 pt-10"
        >
          <div className="text-center mb-8">
            <div className="text-[10px] tracking-[0.3em] text-chrome/50 uppercase font-pixel">
              Company Information
            </div>
            <h3 className="font-display text-2xl text-cream mt-2">会社概要</h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <dl className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-6 gap-y-0 text-sm">
              {[
                { label: "院名", value: BUSINESS.nameJa },
                { label: "院長（代表者）", value: `${BUSINESS.operator}（${BUSINESS.operatorTitle}）` },
                { label: "所在地", value: `〒${BUSINESS.postalCode} ${BUSINESS.addressLine}` },
                { label: "登録番号", value: BUSINESS.registrationNumber },
                { label: "電話番号", value: BUSINESS.phone },
                { label: "営業時間", value: BUSINESS.hours },
                { label: "定休日", value: BUSINESS.hoursNote },
                { label: "開業", value: "2026年4月15日" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="contents"
                >
                  <dt className="py-3 text-chrome/50 text-[11px] tracking-[0.2em] uppercase font-pixel border-b border-chrome/10 md:border-b-0">
                    {row.label}
                  </dt>
                  <dd className="pb-3 md:py-3 text-cream/90 border-b border-chrome/10">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
