"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "ホーム" },
  { href: "/admin/menu-body", label: "コーティング料金" },
  { href: "/admin/menu-wash", label: "洗車メニュー" },
  { href: "/admin/menu-interior", label: "内装料金" },
  { href: "/admin/menu-interior-options", label: "内装オプション" },
  { href: "/admin/menu-glass", label: "ガラス" },
  { href: "/admin/menu-wheel", label: "ホイール" },
  { href: "/admin/menu-b2b", label: "業者様向け" },
  { href: "/admin/menu-brands", label: "ブランド" },
  { href: "/admin/gallery", label: "症例カルテ" },
  { href: "/admin/news", label: "お知らせ" },
  { href: "/admin/useful", label: "ホームケア処方箋" },
  { href: "/admin/testimonials", label: "お客様の声" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="bg-midnight text-cream">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
        <span className="font-display text-lg mr-2">管理画面</span>
        <nav className="flex items-center gap-1 flex-wrap text-sm">
          {links.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-full transition ${
                  active
                    ? "bg-sunset text-midnight font-semibold"
                    : "text-cream/80 hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <Link
            href="/"
            target="_blank"
            className="text-cream/70 hover:text-cream"
          >
            サイトを見る ↗
          </Link>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-full border border-cream/30 hover:bg-white/10 transition"
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
