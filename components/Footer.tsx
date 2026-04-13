import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-midnight text-cream overflow-hidden grain vhs-scan">
      {/* Top foil bar — 90s holographic */}
      <div className="h-2 foil" />
      {/* Pinstripe accents */}
      <div className="pinstripe" />
      <div className="pinstripe opacity-50 mt-1" />

      {/* Sunset glow + neon accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sunset/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-48 h-48 bg-cyan90/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-56 h-56 bg-magenta/[0.08] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/logo.png"
                alt="Car Wash Homies"
                width={64}
                height={64}
                className="w-16 h-16 object-contain rounded-lg opacity-90"
              />
              <div className="flex flex-col leading-none">
                <span className="font-pixel-jp text-[12px] text-cream tracking-wider mt-1">
                  車の美容外科
                </span>
              </div>
            </div>
            <p className="text-chrome/60 text-sm leading-relaxed mb-6 max-w-md">
              ただのコーティング屋さんじゃない、車の美容外科です。
              塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案。
              車の寿命を延ばし、価値を守ります。
            </p>
            <div className="font-display text-lg candy-90s-text retro-italic">
              「車の寿命を延ばし、価値を守る」
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="sticker mb-4 !text-[9px]">
              ★ Menu ★
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { label: "当院のコンセプト", href: "/concept" },
                { label: "施術メニュー", href: "/menu" },
                { label: "施術事例", href: "/gallery" },
                { label: "院長紹介", href: "/doctor" },
                { label: "ご予約・ご相談", href: "/reservation" },
                { label: "アクセス", href: "/access" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-pixel-jp text-[12px] text-chrome/80 hover:text-cyan90 transition-colors flex items-center gap-2"
                  >
                    <span className="text-magenta">&gt;</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="sticker mb-4 !text-[9px]">
              ★ Contact ★
            </div>
            <ul className="space-y-3 text-sm text-chrome/70">
              <li>
                <div className="text-[8px] text-cyan90/70 uppercase tracking-wider font-pixel">
                  Address
                </div>
                <div>
                  〒339-0021
                  <br />
                  埼玉県さいたま市岩槻区末田2421-2
                </div>
              </li>
              <li>
                <div className="text-[8px] text-cyan90/70 uppercase tracking-wider font-pixel">
                  Hours
                </div>
                <div>10:00 — 19:00（不定休）</div>
              </li>
              <li>
                <div className="text-[8px] text-cyan90/70 uppercase tracking-wider font-pixel">
                  Phone
                </div>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="text-sunset font-crt text-xl tracking-wider hover:text-sunset-300 transition-colors leading-none"
                >
                  {BUSINESS.phone}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border-2 border-cream bg-magenta flex items-center justify-center text-cream text-xs font-extrabold tracking-widest shadow-[3px_3px_0_0_#FFF8F0] hover:shadow-neon-magenta hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label={`Instagram @${BUSINESS.instagramHandle}`}
              >
                IG
              </a>
              <a
                href={BUSINESS.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border-2 border-cream bg-cyan90 flex items-center justify-center text-midnight text-xs font-extrabold tracking-widest shadow-[3px_3px_0_0_#FFF8F0] hover:shadow-neon-cyan hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label={`X (Twitter) @${BUSINESS.xHandle}`}
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pinstripe opacity-60 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-chrome/60 font-pixel tracking-wider">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span>© 2026 {BUSINESS.nameJa}. All rights reserved.</span>
            <span
              className="inline-flex items-center gap-2 self-start md:self-auto px-2 py-1 rounded-md border border-chrome/25 bg-chrome/[0.04] text-chrome/80"
              title="適格請求書発行事業者登録番号"
            >
              <span className="text-[8px] text-sunset/80 tracking-widest">
                インボイス
              </span>
              <span>{BUSINESS.registrationNumber}</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-sunset transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="hover:text-sunset transition-colors">
              特定商取引法
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
