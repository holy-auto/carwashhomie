"use client";

import { useEffect, useState } from "react";

const nav = [
  { label: "施術メニュー", href: "#services" },
  { label: "Before / After", href: "#gallery" },
  { label: "Dr. ホーミー", href: "#doctor" },
  { label: "お客様の声", href: "#voice" },
  { label: "カウンセリング", href: "#reservation" },
  { label: "アクセス", href: "#access" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-midnight/90 backdrop-blur-md border-b border-sunset/20 shadow-sunset-glow"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-sunset-gradient flex items-center justify-center shadow-chrome group-hover:animate-hydraulic-bounce">
              <span className="font-script text-midnight text-lg">C</span>
            </div>
            <div className="absolute -inset-1 rounded-full border border-sunset/40 animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl text-cream tracking-wider">
              CarWash<span className="text-sunset">Homie</span>
            </span>
            <span className="text-[10px] text-chrome/60 tracking-[0.2em] uppercase mt-0.5">
              Auto Aesthetic Clinic
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-cream/80 hover:text-sunset transition-colors text-sm tracking-wide relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sunset group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="#reservation"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sunset-gradient text-midnight font-bold text-sm shadow-chrome hover:shadow-sunset-glow transition-all hover:scale-105"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-midnight animate-pulse" />
          無料カウンセリング
        </a>

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
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-cream/80 hover:text-sunset transition-colors py-2 border-b border-sunset/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#reservation"
            className="mt-2 text-center py-3 rounded-full bg-sunset-gradient text-midnight font-bold"
            onClick={() => setOpen(false)}
          >
            無料カウンセリング予約
          </a>
        </nav>
      )}
    </header>
  );
}
