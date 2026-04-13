"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "当院のコンセプト", href: "/concept" },
  { label: "施術メニュー", href: "/menu" },
  { label: "施術事例", href: "/gallery" },
  { label: "院長紹介", href: "/doctor" },
  { label: "ご予約", href: "/reservation" },
  { label: "アクセス", href: "/access" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close mobile nav on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || pathname !== "/"
          ? "bg-midnight/90 backdrop-blur-md border-b-2 border-midnight shadow-sunset-glow"
          : "bg-transparent"
      }`}
    >
      {/* 90s foil bar atop nav when scrolled / on inner pages */}
      {(scrolled || pathname !== "/") && <div className="h-1 foil" />}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Car Wash Homies"
            width={48}
            height={48}
            className="w-12 h-12 object-contain rounded-md opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex flex-col leading-none">
            <span className="font-pixel-jp text-[11px] text-chrome/80 tracking-[0.1em] mt-0.5">
              車の美容外科
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors text-sm tracking-wide relative group ${
                  active ? "text-sunset" : "text-cream/80 hover:text-sunset"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-sunset transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/reservation"
          className="btn-90s hidden lg:inline-flex !text-xs !py-2 !px-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-midnight animate-pulse" />
          無料カウンセリング
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`h-0.5 bg-sunset transition-all ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-sunset transition-all ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-sunset transition-all ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden bg-midnight/95 backdrop-blur-md border-t border-sunset/20 px-6 py-6 flex flex-col gap-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-2 border-b border-sunset/10 ${
                  active ? "text-sunset" : "text-cream/80 hover:text-sunset"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/reservation"
            className="mt-2 text-center py-3 rounded-full bg-sunset-gradient text-midnight font-bold"
            onClick={() => setOpen(false)}
          >
            ご予約・ご相談
          </Link>
        </nav>
      )}
    </header>
  );
}
