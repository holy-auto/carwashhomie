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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome">
                <span className="font-script text-midnight text-xl">C</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl text-cream tracking-wider">
                  CarWash<span className="text-sunset">Homie</span>
                </span>
                <span className="text-[10px] text-chrome/60 tracking-[0.2em] uppercase mt-1">
                  Auto Aesthetic Clinic
                </span>
              </div>
            </div>
            <p className="text-chrome/60 text-sm leading-relaxed mb-6 max-w-md">
              ローライダー専門の洗車・ディテーリングクリニック。
              美容外科の発想で、愛車のボディに極上の施術を提供します。
            </p>
            <div className="font-script text-sunset text-2xl tracking-widest">
              With Love from the Homies
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-[10px] tracking-[0.2em] text-sunset uppercase font-semibold mb-4">
              Menu
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { label: "施術メニュー", href: "#services" },
                { label: "Before / After", href: "#gallery" },
                { label: "Dr. ホーミー", href: "#doctor" },
                { label: "お客様の声", href: "#voice" },
                { label: "カウンセリング予約", href: "#reservation" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-chrome/70 hover:text-sunset transition-colors"
                  >
                    {l.label}
                  </a>
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
                <div>東京都世田谷区 0-0-0</div>
              </li>
              <li>
                <div className="text-[10px] text-chrome/40 uppercase tracking-wider">
                  Hours
                </div>
                <div>10:00 — 19:00（定休日: 火曜）</div>
              </li>
              <li>
                <div className="text-[10px] text-chrome/40 uppercase tracking-wider">
                  Phone
                </div>
                <div className="text-sunset font-semibold">03-0000-0000</div>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {["IG", "TW", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-sunset/30 flex items-center justify-center text-sunset text-xs font-bold hover:bg-sunset hover:text-midnight transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pinstripe opacity-60 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-chrome/50">
          <div>© 2025 CarWashHomie. All rights reserved. Est. 2010.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sunset transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-sunset transition-colors">
              特定商取引法
            </a>
            <a href="#" className="hover:text-sunset transition-colors">
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
