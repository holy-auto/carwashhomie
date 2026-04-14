"use client";

import { useEffect, useState } from "react";

/* Hidden-in-plain-sight theme toggle.
   - Sits fixed at bottom-left, small and low-opacity by default.
   - Lightbulb icon: static in 90s mode, flickers red in ST mode.
   - Toggling writes localStorage["cwh:theme"] so the pre-hydration
     script in <head> can re-apply it on next load without flash.
   - `?theme=st` / `?theme=90s` also work as deep-link entry points
     and are handled by the same pre-hydration script. */

const STORAGE_KEY = "cwh:theme";

export default function ThemeToggle() {
  const [isSt, setIsSt] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsSt(document.documentElement.classList.contains("theme-st"));
  }, []);

  const toggle = () => {
    const next = !isSt;
    setIsSt(next);
    const root = document.documentElement;
    if (next) {
      root.classList.add("theme-st");
      try {
        localStorage.setItem(STORAGE_KEY, "st");
      } catch {
        /* localStorage unavailable — next visit reverts */
      }
    } else {
      root.classList.remove("theme-st");
      try {
        localStorage.setItem(STORAGE_KEY, "90s");
      } catch {
        /* no-op */
      }
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isSt ? "90sモードに切り替え" : "Upside Downに切り替え"
      }
      title={isSt ? "90s" : "Upside Down"}
      className={`fixed bottom-4 left-4 z-[90] w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
        isSt
          ? "bg-black/80 border-red-600/60 text-red-500 shadow-[0_0_16px_rgba(229,9,20,0.55)] animate-pulse"
          : "bg-midnight/70 border-chrome/20 text-sunset/70 opacity-40 hover:opacity-100 backdrop-blur-sm"
      }`}
    >
      {/* Lightbulb icon — Will Byers wall bulb */}
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.7.7 1 1.6 1 2.3v1h6v-1c0-.7.3-1.6 1-2.3A7 7 0 0 0 12 2z" />
      </svg>
    </button>
  );
}
