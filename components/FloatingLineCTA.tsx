"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/lib/constants";

/* Floating LINE chat CTA — bottom-right, fixed.
   Appears after the user scrolls past the hero so it doesn't
   compete with the in-hero primary CTAs. Hidden on /reservation
   (the form itself is the conversion target there). */
export default function FloatingLineCTA() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const handler = () => setShown(window.scrollY > 320);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (pathname === "/reservation") return null;

  return (
    <a
      href={BUSINESS.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="公式LINEで友だち追加・相談する"
      className={`fixed z-40 bottom-5 right-5 md:bottom-8 md:right-8 transition-all duration-500 ${
        shown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="relative group">
        {/* Pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#06C755]/40 animate-ping"
        />
        <div className="relative flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-[#06C755] border-2 border-cream text-white font-bold shadow-[4px_4px_0_0_#1A0F08] group-hover:shadow-[6px_6px_0_0_#FF2E97] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 36 36"
              className="w-6 h-6"
              fill="#06C755"
            >
              <path d="M18 3C9.716 3 3 8.412 3 15.086c0 5.985 5.32 10.998 12.504 11.946.487.105 1.15.32 1.317.736.151.378.099.97.048 1.353l-.213 1.28c-.066.378-.302 1.482 1.299.808 1.6-.673 8.628-5.08 11.77-8.696 2.17-2.378 3.21-4.79 3.21-7.427C32.935 8.412 26.218 3 18 3z" />
              <path
                fill="#fff"
                d="M14.94 11.92h-1.05a.29.29 0 00-.29.29v6.52c0 .16.13.29.29.29h1.05c.16 0 .29-.13.29-.29v-6.52a.29.29 0 00-.29-.29zm7.22 0h-1.05a.29.29 0 00-.29.29v3.87l-2.99-4.03a.3.3 0 00-.02-.03l-.02-.02-.01-.01-.02-.01-.02-.01-.01-.01h-.04l-.01-.01h-1.08a.29.29 0 00-.29.29v6.52c0 .16.13.29.29.29h1.05c.16 0 .29-.13.29-.29v-3.87l2.99 4.04c.02.03.05.05.08.07l.01.01h.02l.02.01h.05c.02 0 .05.01.07.01h1.05c.16 0 .29-.13.29-.29v-6.52a.29.29 0 00-.3-.3zm-9.74 5.46h-2.85v-5.17a.29.29 0 00-.29-.29h-1.05a.29.29 0 00-.29.29v6.52c0 .08.03.15.08.2.05.05.12.08.2.08h4.2c.16 0 .29-.13.29-.29v-1.05a.29.29 0 00-.29-.29zm15.06-3.83a.29.29 0 00.29-.29v-1.05a.29.29 0 00-.29-.29h-4.2a.29.29 0 00-.2.08l-.02.02-.01.02a.3.3 0 00-.06.18v6.52c0 .08.03.15.08.2.05.05.13.08.2.08h4.2c.16 0 .29-.13.29-.29v-1.05a.29.29 0 00-.29-.29h-2.85v-1.1h2.85c.16 0 .29-.13.29-.29V14.6a.29.29 0 00-.29-.29h-2.85v-1.1h2.85z"
              />
            </svg>
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-pixel text-[8px] tracking-[0.2em] uppercase opacity-90">
              LINE
            </span>
            <span className="text-sm font-extrabold tracking-wide">
              気軽に相談
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
