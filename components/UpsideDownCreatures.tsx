"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Upside-Down creatures — only active when `.theme-st` is on.
   Scroll events throttle-spawn a random creature (demogorgon, vecna
   hand, mind flayer, demobat) at a random edge position; each one
   fades in, flickers, then fades out. Pointer-events-none so the
   overlay never blocks clicks. Respects prefers-reduced-motion.

   Each SVG applies an feTurbulence + feDisplacementMap filter for
   subtle organic edge wobble — sells the "wet, fleshy" silhouette
   feel without needing raster art. */

type CreatureType = "demogorgon" | "vecna" | "mindflayer" | "demobat";

type Creature = {
  id: number;
  type: CreatureType;
  xPct: number; // final horizontal position, 0-100
  yPct: number; // vertical position, 0-100
  fromLeft: boolean; // peek direction
  scale: number;
  rotate: number;
  seed: number; // turbulence seed — varies per spawn so each instance wobbles differently
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
        xPct: fromLeft ? Math.random() * 18 : 82 + Math.random() * 18,
        yPct: 6 + Math.random() * 78,
        scale: 0.85 + Math.random() * 0.7,
        rotate: -14 + Math.random() * 28,
        seed: Math.floor(Math.random() * 1000),
      };

      setCreatures((prev) => [...prev, c]);
      // Auto-remove after full animation (3.2s) so the list doesn't grow
      window.setTimeout(() => {
        setCreatures((prev) => prev.filter((x) => x.id !== c.id));
      }, 3200);
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
  const { type, xPct, yPct, fromLeft, scale, rotate, seed } = creature;
  // Peek-in offset: slide in 44px from the edge
  const offset = fromLeft ? -44 : 44;

  return (
    <motion.div
      initial={{ opacity: 0, x: offset, scale: scale * 0.9 }}
      animate={{
        // Double-flicker: fade in → dip → back up → fade out
        opacity: [0, 0.6, 0.35, 0.62, 0.58, 0],
        x: [offset, 0, 0, 0, 0, offset * 0.5],
        scale: [scale * 0.9, scale, scale, scale * 1.04, scale, scale],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 3.2,
        times: [0, 0.15, 0.28, 0.4, 0.72, 1],
        ease: "easeInOut",
      }}
      className="absolute"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `rotate(${rotate}deg)`,
        filter:
          "drop-shadow(0 0 22px rgb(var(--c-sunset) / 0.55)) drop-shadow(0 0 6px rgb(var(--c-sunset) / 0.9))",
        color: "rgb(var(--c-midnight))",
      }}
    >
      <CreatureSvg type={type} seed={seed} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function CreatureSvg({
  type,
  seed,
}: {
  type: CreatureType;
  seed: number;
}) {
  switch (type) {
    case "demogorgon":
      return <DemogorgonSvg seed={seed} />;
    case "vecna":
      return <VecnaHandSvg seed={seed} />;
    case "mindflayer":
      return <MindFlayerSvg seed={seed} />;
    case "demobat":
      return <DemobatSvg seed={seed} />;
  }
}

/* Shared turbulence filter applied inline per-SVG. Uses useId to
   generate a DOM-unique filter id per instance so concurrent
   creatures don't collide. Displacement scale ≈ 2.5 gives organic
   wobble without destroying silhouette readability. */
function useWobbleFilter(seed: number) {
  const base = useId().replace(/:/g, "");
  const id = `wobble-${base}`;
  const defs = (
    <defs>
      <filter
        id={id}
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.018"
          numOctaves="2"
          seed={seed}
        />
        <feDisplacementMap in="SourceGraphic" scale="2.6" />
      </filter>
    </defs>
  );
  return { id, defs };
}

/* ─────────────────────────────────────────────────────────────── */

/* Demogorgon — full standing figure: gaunt humanoid body, 5-petal
   flower face splayed wide with teeth visible inside, long clawed
   arms dangling past the hip, digitigrade legs ending in claws. */
function DemogorgonSvg({ seed }: { seed: number }) {
  const { id, defs } = useWobbleFilter(seed);
  return (
    <svg
      width="150"
      height="360"
      viewBox="0 0 160 400"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}
      <g filter={`url(#${id})`}>
        {/* Neck */}
        <path d="M74 72 C 72 80, 72 88, 74 96 L 86 96 C 88 88, 88 80, 86 72 Z" />

        {/* Torso — gaunt hourglass with subtle ribcage shelf */}
        <path
          d="M74 94
            C 62 98, 56 112, 56 130
            C 58 150, 64 172, 66 194
            C 62 216, 58 240, 60 264
            C 62 284, 68 304, 72 322
            C 74 328, 74 334, 76 340
            L 84 340
            C 86 334, 86 328, 88 322
            C 92 304, 98 284, 100 264
            C 102 240, 98 216, 94 194
            C 96 172, 102 150, 104 130
            C 104 112, 98 98, 86 94 Z"
        />

        {/* Ribcage indentations — negative-space hints rendered as
            thin darker slashes using inline style for subtlety */}
        <g opacity="0.45" stroke="rgb(var(--c-sunset))" strokeWidth="0.9" fill="none">
          <path d="M63 145 Q 80 152 97 145" />
          <path d="M61 165 Q 80 172 99 165" />
          <path d="M62 185 Q 80 192 98 185" />
        </g>

        {/* Left arm — long, spindly, reaching below hip */}
        <path
          d="M58 114
            C 48 126, 40 146, 36 172
            C 34 198, 34 226, 36 252
            C 38 272, 40 288, 42 300
            L 46 300
            C 46 288, 46 272, 48 254
            C 50 228, 54 202, 60 176
            C 64 152, 68 132, 70 118 Z"
        />
        {/* Left hand — 4 long curved claws */}
        <path d="M36 298 C 33 316, 31 332, 32 348 C 34 350, 36 348, 38 344 L 40 298 Z" />
        <path d="M40 298 L 41 352 C 43 354, 45 352, 46 346 L 44 298 Z" />
        <path d="M44 298 L 47 354 C 49 354, 50 352, 50 346 L 48 298 Z" />
        <path d="M48 298 L 52 348 C 54 346, 54 342, 53 338 L 51 300 Z" />

        {/* Right arm — mirrored */}
        <path
          d="M102 114
            C 112 126, 120 146, 124 172
            C 126 198, 126 226, 124 252
            C 122 272, 120 288, 118 300
            L 114 300
            C 114 288, 114 272, 112 254
            C 110 228, 106 202, 100 176
            C 96 152, 92 132, 90 118 Z"
        />
        {/* Right hand — 4 claws */}
        <path d="M124 298 C 127 316, 129 332, 128 348 C 126 350, 124 348, 122 344 L 120 298 Z" />
        <path d="M120 298 L 119 352 C 117 354, 115 352, 114 346 L 116 298 Z" />
        <path d="M116 298 L 113 354 C 111 354, 110 352, 110 346 L 112 298 Z" />
        <path d="M112 298 L 108 348 C 106 346, 106 342, 107 338 L 109 300 Z" />

        {/* Left leg — digitigrade */}
        <path
          d="M70 334
            C 66 350, 62 372, 58 392
            L 62 398
            L 70 398
            L 72 380
            L 74 360
            L 76 346 Z"
        />
        {/* Left foot claws */}
        <path d="M58 396 L 54 404 L 58 406 L 60 400 Z" />
        <path d="M62 398 L 61 408 L 64 408 L 65 400 Z" />
        <path d="M66 398 L 67 406 L 70 404 L 69 400 Z" />

        {/* Right leg — mirrored */}
        <path
          d="M90 334
            C 94 350, 98 372, 102 392
            L 98 398
            L 90 398
            L 88 380
            L 86 360
            L 84 346 Z"
        />
        {/* Right foot claws */}
        <path d="M102 396 L 106 404 L 102 406 L 100 400 Z" />
        <path d="M98 398 L 99 408 L 96 408 L 95 400 Z" />
        <path d="M94 398 L 93 406 L 90 404 L 91 400 Z" />

        {/* Head — 5 petals splayed wide around a dark throat */}
        <g transform="translate(80 42)">
          {/* Dark throat cavity (visible between petals) */}
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="rgb(var(--c-midnight))" />
          {/* 5 petals — each rotated 72° */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              {/* Petal body: wide teardrop with pointed tip */}
              <path
                d="M0 -6
                   C -14 -10, -24 -22, -22 -36
                   C -19 -48, -10 -56, 0 -60
                   C 10 -56, 19 -48, 22 -36
                   C 24 -22, 14 -10, 0 -6 Z"
              />
              {/* Teeth along the inner edge of the petal */}
              <g fill="rgb(var(--c-midnight))">
                <path d="M-10 -14 L -8 -8 L -6 -14 Z" />
                <path d="M-5 -16 L -3 -10 L -1 -16 Z" />
                <path d="M1 -16 L 3 -10 L 5 -16 Z" />
                <path d="M6 -14 L 8 -8 L 10 -14 Z" />
              </g>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */

/* Vecna's hand — gnarled, reaching from below with individual
   knuckle bumps, long curved claws, visible tendons on the back,
   and vine tendrils wrapping the wrist. */
function VecnaHandSvg({ seed }: { seed: number }) {
  const { id, defs } = useWobbleFilter(seed);
  return (
    <svg
      width="160"
      height="240"
      viewBox="0 0 180 260"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}
      <g filter={`url(#${id})`}>
        {/* Forearm, tapering into palm */}
        <path
          d="M60 230
             C 58 240, 56 252, 60 260
             L 120 260
             C 124 252, 122 240, 120 230
             C 120 215, 118 200, 116 186
             C 114 170, 110 158, 106 150
             L 74 150
             C 70 158, 66 170, 64 186
             C 62 200, 60 215, 60 230 Z"
        />

        {/* Wrist vine tendrils wrapping across the forearm */}
        <g fill="rgb(var(--c-midnight))" opacity="0.7">
          <path d="M56 216 C 70 222, 82 218, 100 224 C 112 228, 122 224, 126 218 C 118 232, 100 232, 84 230 C 72 228, 60 226, 56 216 Z" />
          <path d="M58 240 C 72 246, 88 244, 108 248 C 118 250, 124 246, 126 240 C 118 254, 98 256, 82 254 C 70 252, 60 250, 58 240 Z" />
        </g>

        {/* Palm — broader, knuckled */}
        <path
          d="M54 156
             C 48 148, 48 132, 56 122
             C 64 114, 82 112, 92 114
             C 104 114, 118 118, 124 128
             C 132 138, 132 150, 128 158
             L 128 170
             L 54 170 Z"
        />

        {/* Knuckle bumps along top of palm */}
        <g>
          <circle cx="62" cy="118" r="5" />
          <circle cx="76" cy="112" r="5.5" />
          <circle cx="92" cy="110" r="5.5" />
          <circle cx="108" cy="114" r="5" />
        </g>

        {/* Four long clawed fingers — each with 3 knuckle segments
            and a curved claw at the tip */}
        {/* Index finger (leftmost) */}
        <path
          d="M56 118
             C 50 96, 48 72, 50 50
             C 52 34, 56 20, 62 10
             C 66 4, 70 6, 72 14
             C 74 28, 72 46, 70 62
             C 68 82, 66 100, 66 118 Z"
        />
        <path d="M62 10 L 58 -4 L 66 2 Z" fill="rgb(var(--c-midnight))" />
        {/* Middle finger */}
        <path
          d="M72 114
             C 68 90, 66 62, 70 36
             C 72 20, 78 6, 84 0
             C 88 -4, 92 -2, 92 8
             C 92 24, 88 44, 86 64
             C 84 86, 82 104, 82 116 Z"
        />
        <path d="M84 0 L 82 -14 L 90 -8 Z" fill="rgb(var(--c-midnight))" />
        {/* Ring finger */}
        <path
          d="M88 116
             C 88 92, 90 64, 96 40
             C 100 24, 106 14, 110 10
             C 114 8, 116 14, 114 24
             C 110 40, 104 60, 100 80
             C 96 96, 94 110, 96 118 Z"
        />
        <path d="M110 10 L 112 -4 L 118 6 Z" fill="rgb(var(--c-midnight))" />
        {/* Pinky finger (smallest) */}
        <path
          d="M104 120
             C 108 100, 114 78, 120 60
             C 124 46, 128 36, 132 32
             C 136 30, 138 34, 136 42
             C 132 56, 124 74, 118 90
             C 112 104, 110 118, 112 124 Z"
        />
        <path d="M132 32 L 136 22 L 140 30 Z" fill="rgb(var(--c-midnight))" />

        {/* Thumb splayed left with its own claw */}
        <path
          d="M58 142
             C 48 138, 36 128, 28 114
             C 22 104, 18 94, 16 86
             C 18 82, 24 84, 30 90
             C 42 102, 52 116, 60 128 Z"
        />
        <path d="M16 86 L 8 78 L 14 76 Z" fill="rgb(var(--c-midnight))" />

        {/* Tendon lines on back of hand */}
        <g
          stroke="rgb(var(--c-sunset))"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        >
          <path d="M62 120 Q 70 140 74 164" />
          <path d="M78 118 Q 82 140 86 164" />
          <path d="M96 120 Q 96 142 96 164" />
          <path d="M110 122 Q 110 142 108 164" />
        </g>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */

/* Mind Flayer — massive shadow spider rising. Central cloud-body
   with multiple long curved legs reaching up, mouth-tentacles
   dangling from underside, wispy vapor edges. */
function MindFlayerSvg({ seed }: { seed: number }) {
  const { id, defs } = useWobbleFilter(seed);
  return (
    <svg
      width="260"
      height="240"
      viewBox="0 0 300 260"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}
      <g filter={`url(#${id})`}>
        {/* Lower body — large amorphous cloud with irregular bumps */}
        <path
          d="M50 180
             C 40 172, 36 160, 44 152
             C 50 144, 60 140, 72 142
             C 80 134, 92 130, 104 134
             C 114 128, 128 126, 140 132
             C 150 124, 166 124, 180 132
             C 192 128, 208 132, 216 142
             C 226 138, 240 142, 250 152
             C 258 160, 260 172, 252 180
             C 258 192, 252 206, 240 210
             C 230 216, 214 214, 200 208
             C 186 216, 164 218, 146 212
             C 130 218, 108 218, 92 210
             C 78 216, 62 214, 54 208
             C 44 204, 40 192, 50 180 Z"
        />

        {/* Inner body shading — darker secondary mass */}
        <path
          d="M80 174
             C 90 168, 106 166, 120 170
             C 136 166, 156 166, 172 172
             C 188 168, 206 172, 216 180
             C 220 190, 210 200, 194 198
             C 180 204, 160 204, 144 200
             C 128 204, 108 202, 94 196
             C 82 192, 76 182, 80 174 Z"
          fill="rgb(var(--c-sunset))"
          opacity="0.35"
        />

        {/* 8 spider-legs rising upward, each with a joint and taper */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <path d="M62 160 C 42 130, 30 90, 18 30" />
          <path d="M90 148 C 80 110, 72 70, 62 14" />
          <path d="M118 142 C 114 100, 112 60, 108 8" />
          <path d="M148 138 C 146 92, 148 46, 146 2" />
          <path d="M182 140 C 186 96, 184 50, 180 4" />
          <path d="M214 144 C 220 104, 224 64, 224 14" />
          <path d="M240 152 C 248 118, 256 78, 264 26" />
          <path d="M258 168 C 272 140, 282 100, 288 54" />
        </g>

        {/* Barbs/spikes along a few tentacle legs */}
        <g fill="currentColor">
          <path d="M26 58 L 20 52 L 22 62 Z" />
          <path d="M72 60 L 66 54 L 70 66 Z" />
          <path d="M114 54 L 108 48 L 112 60 Z" />
          <path d="M150 40 L 144 34 L 148 46 Z" />
          <path d="M188 44 L 184 34 L 192 42 Z" />
          <path d="M224 62 L 220 52 L 228 58 Z" />
          <path d="M264 72 L 258 66 L 270 72 Z" />
        </g>

        {/* Underside mouth tentacles */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M90 210 Q 78 232 72 258" />
          <path d="M124 216 Q 120 238 122 260" />
          <path d="M152 220 Q 152 240 150 260" />
          <path d="M180 216 Q 182 236 186 258" />
          <path d="M212 210 Q 220 232 228 258" />
        </g>
        <g fill="currentColor">
          <circle cx="72" cy="258" r="3" />
          <circle cx="122" cy="260" r="3" />
          <circle cx="150" cy="260" r="3" />
          <circle cx="186" cy="258" r="3" />
          <circle cx="228" cy="258" r="3" />
        </g>

        {/* Wispy vapor edges */}
        <g opacity="0.5">
          <ellipse cx="42" cy="200" rx="14" ry="4" />
          <ellipse cx="258" cy="202" rx="14" ry="4" />
          <ellipse cx="150" cy="216" rx="22" ry="5" />
        </g>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */

/* Demobat — detailed bat silhouette: body with open fanged face,
   visible wing finger-bones and scalloped membrane, twin ear
   tendrils, and a tail whip. */
function DemobatSvg({ seed }: { seed: number }) {
  const { id, defs } = useWobbleFilter(seed);
  return (
    <svg
      width="220"
      height="150"
      viewBox="0 0 260 180"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}
      <g filter={`url(#${id})`}>
        {/* Body (torso) */}
        <path
          d="M125 55
             C 118 58, 114 68, 116 82
             C 116 96, 120 110, 124 122
             C 128 130, 132 136, 130 144
             C 134 142, 138 138, 140 130
             C 144 118, 148 104, 148 90
             C 150 76, 146 62, 140 58
             C 134 54, 130 54, 125 55 Z"
        />

        {/* Head with petal-split jaw hinting at Demogorgon kinship */}
        <path
          d="M122 44
             C 118 40, 118 32, 124 28
             C 130 26, 138 26, 142 30
             C 146 34, 146 42, 142 46
             C 140 50, 136 52, 130 52
             C 126 52, 122 48, 122 44 Z"
        />
        {/* Fanged mouth — open, showing teeth */}
        <path
          d="M124 42 L 120 54 L 126 48 L 128 56 L 132 48 L 136 56 L 138 48 L 142 54 L 140 42 Z"
          fill="rgb(var(--c-midnight))"
        />
        {/* Upper and lower fang points */}
        <g fill="currentColor">
          <path d="M122 44 L 118 52 L 124 48 Z" />
          <path d="M142 44 L 146 52 L 140 48 Z" />
        </g>

        {/* Twin ear tendrils */}
        <path d="M124 28 L 116 10 L 124 20 Z" />
        <path d="M140 28 L 148 10 L 140 20 Z" />

        {/* LEFT WING — membrane with 4 finger bones visible */}
        <path
          d="M118 62
             C 80 50, 40 44, 8 44
             C 16 60, 30 74, 46 80
             C 26 82, 10 92, 4 104
             C 22 102, 42 102, 58 100
             C 40 106, 24 118, 14 134
             C 34 126, 56 116, 76 110
             C 60 118, 48 132, 42 150
             C 62 140, 82 126, 100 112
             C 92 122, 88 134, 90 148
             C 104 136, 114 118, 120 96 Z"
        />
        {/* Left wing finger bones (lighter strokes on top of membrane) */}
        <g
          fill="none"
          stroke="rgb(var(--c-sunset))"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        >
          <path d="M118 62 L 8 46" />
          <path d="M118 64 L 12 94" />
          <path d="M118 66 L 32 130" />
          <path d="M118 68 L 78 150" />
        </g>

        {/* RIGHT WING — mirrored */}
        <path
          d="M148 62
             C 186 50, 220 44, 252 44
             C 244 60, 230 74, 214 80
             C 234 82, 250 92, 256 104
             C 238 102, 218 102, 202 100
             C 220 106, 236 118, 246 134
             C 226 126, 204 116, 184 110
             C 200 118, 212 132, 218 150
             C 198 140, 178 126, 160 112
             C 168 122, 172 134, 170 148
             C 156 136, 146 118, 140 96 Z"
        />
        {/* Right wing bones */}
        <g
          fill="none"
          stroke="rgb(var(--c-sunset))"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        >
          <path d="M142 62 L 252 46" />
          <path d="M142 64 L 248 94" />
          <path d="M142 66 L 228 130" />
          <path d="M142 68 L 182 150" />
        </g>

        {/* Tail whip */}
        <path
          d="M130 140
             Q 134 156 126 172
             Q 124 176 120 178"
          stroke="currentColor"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M120 178 L 116 180 L 122 176 Z" />
      </g>
    </svg>
  );
}
