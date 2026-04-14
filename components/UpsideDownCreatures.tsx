"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Upside-Down creatures — only active when `.theme-st` is on.
   Scroll events throttle-spawn a random creature (demogorgon, vecna
   hand, mind flayer, demobat) at a random edge position; each one
   fades in, flickers, then fades out. Pointer-events-none so the
   overlay never blocks clicks. Respects prefers-reduced-motion. */

type CreatureType = "demogorgon" | "vecna" | "mindflayer" | "demobat";

type Creature = {
  id: number;
  type: CreatureType;
  xPct: number; // final horizontal position, 0-100
  yPct: number; // vertical position, 0-100
  fromLeft: boolean; // peek direction
  scale: number;
  rotate: number;
};

const TYPES: CreatureType[] = ["demogorgon", "vecna", "mindflayer", "demobat"];

export default function UpsideDownCreatures() {
  const [active, setActive] = useState(false);
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);

  /* Watch for .theme-st on <html> so we react to the ThemeToggle
     without needing a shared store. Cleanup on unmount. */
  useEffect(() => {
    const check = () =>
      setActive(document.documentElement.classList.contains("theme-st"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) {
      setCreatures([]);
      return;
    }

    // Skip entirely if the user prefers reduced motion.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const now = Date.now();
      // Throttle: no more than one spawn attempt per 600ms
      if (now - lastSpawnRef.current < 600) return;
      // Only ~35% of eligible ticks actually spawn (sparser = scarier)
      if (Math.random() > 0.35) return;
      lastSpawnRef.current = now;

      const fromLeft = Math.random() > 0.5;
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      const c: Creature = {
        id: idRef.current++,
        type,
        fromLeft,
        // Peek from edge: left-side creatures sit at 0-18%, right at 82-100%
        xPct: fromLeft
          ? Math.random() * 18
          : 82 + Math.random() * 18,
        yPct: 8 + Math.random() * 78,
        scale: 0.65 + Math.random() * 0.55,
        rotate: -18 + Math.random() * 36,
      };

      setCreatures((prev) => [...prev, c]);
      // Auto-remove after full animation (2.8s) so the list doesn't grow
      window.setTimeout(() => {
        setCreatures((prev) => prev.filter((x) => x.id !== c.id));
      }, 2800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[45] overflow-hidden"
    >
      <AnimatePresence>
        {creatures.map((c) => (
          <CreatureSprite key={c.id} creature={c} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function CreatureSprite({ creature }: { creature: Creature }) {
  const { type, xPct, yPct, fromLeft, scale, rotate } = creature;
  // Peek-in offset: slide in 40px from the edge
  const offset = fromLeft ? -40 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: offset, scale: scale * 0.9 }}
      animate={{
        opacity: [0, 0.55, 0.55, 0.6, 0],
        x: [offset, 0, 0, 0, offset * 0.6],
        scale: [scale * 0.9, scale, scale, scale * 1.05, scale],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2.8,
        times: [0, 0.18, 0.55, 0.72, 1],
        ease: "easeInOut",
      }}
      className="absolute"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `rotate(${rotate}deg)`,
        filter:
          "drop-shadow(0 0 18px rgb(var(--c-sunset) / 0.5)) drop-shadow(0 0 4px rgb(var(--c-sunset) / 0.8))",
        color: "rgb(var(--c-midnight))",
      }}
    >
      <CreatureSvg type={type} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function CreatureSvg({ type }: { type: CreatureType }) {
  switch (type) {
    case "demogorgon":
      return <DemogorgonSvg />;
    case "vecna":
      return <VecnaHandSvg />;
    case "mindflayer":
      return <MindFlayerSvg />;
    case "demobat":
      return <DemobatSvg />;
  }
}

/* Demogorgon: iconic 5-petal open flower face atop a gaunt body.
   Rendered as stacked ellipses + a silhouette body path. */
function DemogorgonSvg() {
  return (
    <svg
      width="96"
      height="132"
      viewBox="0 0 100 140"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* body silhouette */}
      <path d="M42 60 C 36 72, 34 90, 38 110 C 40 122, 44 132, 48 138 L 52 138 C 56 132, 60 122, 62 110 C 66 90, 64 72, 58 60 Z" />
      {/* arms */}
      <path d="M38 72 C 30 80, 26 96, 28 116 L 32 116 C 32 98, 36 86, 42 78 Z" />
      <path d="M62 72 C 70 80, 74 96, 72 116 L 68 116 C 68 98, 64 86, 58 78 Z" />
      {/* flower head center */}
      <circle cx="50" cy="38" r="7" />
      {/* 5 petals at 72° intervals */}
      <g>
        <ellipse cx="50" cy="16" rx="10" ry="22" />
        <ellipse
          cx="50"
          cy="16"
          rx="10"
          ry="22"
          transform="rotate(72 50 38)"
        />
        <ellipse
          cx="50"
          cy="16"
          rx="10"
          ry="22"
          transform="rotate(144 50 38)"
        />
        <ellipse
          cx="50"
          cy="16"
          rx="10"
          ry="22"
          transform="rotate(216 50 38)"
        />
        <ellipse
          cx="50"
          cy="16"
          rx="10"
          ry="22"
          transform="rotate(288 50 38)"
        />
      </g>
    </svg>
  );
}

/* Vecna's hand: long gnarled fingers reaching upward. */
function VecnaHandSvg() {
  return (
    <svg
      width="84"
      height="120"
      viewBox="0 0 100 140"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* palm */}
      <ellipse cx="50" cy="110" rx="20" ry="22" />
      {/* forearm */}
      <rect x="40" y="120" width="20" height="20" rx="4" />
      {/* 4 long fingers + thumb */}
      <path d="M30 100 C 26 60, 30 30, 34 20 C 38 30, 38 60, 38 98 Z" />
      <path d="M42 96 C 40 50, 44 18, 48 6 C 52 18, 52 50, 50 96 Z" />
      <path d="M54 96 C 52 50, 56 22, 60 12 C 64 22, 64 50, 62 96 Z" />
      <path d="M66 100 C 64 60, 68 34, 72 26 C 76 34, 76 60, 74 98 Z" />
      {/* thumb, splayed out */}
      <path d="M24 106 C 16 90, 10 72, 8 58 C 14 68, 22 84, 30 100 Z" />
    </svg>
  );
}

/* Mind Flayer: cloud-like spider body with tentacle legs reaching up. */
function MindFlayerSvg() {
  return (
    <svg
      width="140"
      height="120"
      viewBox="0 0 160 140"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* main body blob */}
      <ellipse cx="80" cy="90" rx="38" ry="22" />
      <ellipse cx="60" cy="82" rx="22" ry="16" />
      <ellipse cx="100" cy="82" rx="22" ry="16" />
      {/* tentacle legs — drawn as thick strokes for silhouette feel */}
      <g
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M50 88 Q 36 60 28 20" />
        <path d="M62 78 Q 54 48 50 8" />
        <path d="M76 74 Q 74 40 72 4" />
        <path d="M88 74 Q 90 40 92 4" />
        <path d="M102 78 Q 110 48 114 8" />
        <path d="M114 88 Q 128 60 136 20" />
        {/* lower drooping tendrils */}
        <path d="M60 108 Q 56 124 52 138" />
        <path d="M80 112 Q 80 128 80 140" />
        <path d="M100 108 Q 104 124 108 138" />
      </g>
    </svg>
  );
}

/* Demobat: bat silhouette with membrane wings spread. */
function DemobatSvg() {
  return (
    <svg
      width="120"
      height="72"
      viewBox="0 0 160 96"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* body */}
      <ellipse cx="80" cy="50" rx="10" ry="18" />
      {/* head */}
      <circle cx="80" cy="32" r="8" />
      {/* ears/tendrils */}
      <path d="M74 26 L 70 14 L 78 22 Z" />
      <path d="M86 26 L 90 14 L 82 22 Z" />
      {/* left wing */}
      <path d="M72 44 L 10 30 L 4 56 L 30 54 L 20 70 L 44 60 L 34 78 L 60 62 L 70 66 Z" />
      {/* right wing */}
      <path d="M88 44 L 150 30 L 156 56 L 130 54 L 140 70 L 116 60 L 126 78 L 100 62 L 90 66 Z" />
      {/* tail tendril */}
      <path
        d="M80 66 Q 82 82 76 92"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
