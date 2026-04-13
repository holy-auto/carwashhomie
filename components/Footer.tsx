import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-midnight text-cream overflow-hidden grain">
      {/* Top pinstripe accent */}
      <div className="pinstripe" />
      <div className="pinstripe opacity-50 mt-1" />

      {/* Sunset glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sunset/20 rounded-full blur-3xl pointer-events-none" />

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
                <span className="text-[10px] text-chrome/60 tracking-[0.2em] mt-1">
                  車の美容外科
                </span>
              </div>
            </div>
            <p className="text-chrome/60 text-sm leading-relaxed mb-6 max-w-md">
              ただのコーティング屋さんじゃない、車の美容外科です。
              塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案。
              車の寿命を延ばし、価値を守ります。
            </p>
            <div className="font-display text-sunset text-lg">
              「車の寿命を延ばし、価値を守る」
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-4">
              Menu
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
                    className="text-chrome/70 hover:text-sunset transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-4">
              Contact
            </div>
            <ul className="space-y-3 text-sm text-chrome/70">
              <li>
                <div className="text-[10px] text-chrome/40 uppercase tracking-wider">
                  Address
                </div>
                <div>
                  〒339-0021
                  <br />
                  埼玉県さいたま市岩槻区末田2421-2
                </div>
              </li>
              <li>
                <div className="text-[10px] text-chrome/40 uppercase tracking-wider">
                  Hours
                </div>
                <div>10:00 — 19:00（不定休）</div>
              </li>
              <li>
                <div className="text-[10px] text-chrome/40 uppercase tracking-wider">
                  Phone
                </div>
                <a
                  href="tel:0486064977"
                  className="text-sunset font-semibold hover:text-sunset-300 transition-colors"
                >
                  048-606-4977
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/japanese_detailer_girl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-sunset/30 flex items-center justify-center text-sunset text-xs font-bold hover:bg-sunset hover:text-midnight transition-all"
                aria-label="Instagram"
              >
                IG
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pinstripe opacity-60 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-chrome/50">
          <div>
            © 2025 車の美容外科 Car Wash Homies. All rights reserved.
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            登録番号 T8810011150208
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sunset transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-sunset transition-colors">
              特定商取引法
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
