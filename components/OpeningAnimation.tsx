"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Converging sparks — deterministic positions around the logo */
const SPARKS = [
  { angle: 0, delay: 0.0, dist: 480 },
  { angle: 32, delay: 0.15, dist: 520 },
  { angle: 58, delay: 0.08, dist: 460 },
  { angle: 94, delay: 0.22, dist: 500 },
  { angle: 126, delay: 0.05, dist: 540 },
  { angle: 158, delay: 0.3, dist: 470 },
  { angle: 188, delay: 0.12, dist: 510 },
  { angle: 216, delay: 0.25, dist: 490 },
  { angle: 246, delay: 0.18, dist: 530 },
  { angle: 278, delay: 0.04, dist: 460 },
  { angle: 308, delay: 0.28, dist: 510 },
  { angle: 338, delay: 0.1, dist: 480 },
];

/* Calligraphy stroke sequence — follows the natural 書き順 of each
   character in the "Car / Wash / Homies" blackletter logo.
   Rules honored:
     • Capitals first: verticals before horizontals (H = |, |, —)
     • Lowercase 'a' : bowl first, then down-stroke
     • 'r' / 'h' / 'm': vertical stem first, then arch(es)
     • 'i'          : stem then dot
     • 'e'          : enclosing curve then middle bar
     • 'W' / 'V'     : left-to-right zigzag diagonals
   Each path paints white into the SVG mask, so the logo is
   progressively revealed underneath the pen. */
const STROKES: {
  d: string;
  w: number;
  delay: number;
  dur: number;
  tip?: { cx: number; cy: number };
}[] = [
  // --- Top ornamental flourish (opening swash) ---
  {
    d: "M 38 62 C 130 30 270 30 362 62",
    w: 30,
    delay: 0.7,
    dur: 0.35,
    tip: { cx: 9.5, cy: 15.5 },
  },

  // ─── "Car" ───
  // C — single ornamental arc
  {
    d: "M 168 105 C 95 108 75 155 85 185 C 100 205 145 205 170 195",
    w: 54,
    delay: 1.08,
    dur: 0.3,
    tip: { cx: 42, cy: 26.25 },
  },
  // a — bowl first
  {
    d: "M 220 150 C 195 148 182 165 192 182 C 210 195 228 182 228 168",
    w: 34,
    delay: 1.4,
    dur: 0.12,
  },
  // a — down-stroke
  { d: "M 230 150 L 230 195", w: 28, delay: 1.52, dur: 0.08 },
  // r — vertical stem
  { d: "M 258 195 L 258 155", w: 30, delay: 1.62, dur: 0.08 },
  // r — top hook
  {
    d: "M 258 155 C 268 147 282 147 292 160",
    w: 26,
    delay: 1.7,
    dur: 0.1,
  },

  // ─── "Wash" ───
  // W — 4 zigzag diagonals, left → right
  {
    d: "M 105 215 L 122 285",
    w: 30,
    delay: 1.82,
    dur: 0.09,
    tip: { cx: 26.25, cy: 53.75 },
  },
  { d: "M 122 285 L 142 225", w: 30, delay: 1.91, dur: 0.08 },
  { d: "M 142 225 L 162 285", w: 30, delay: 1.99, dur: 0.08 },
  { d: "M 162 285 L 182 215", w: 30, delay: 2.07, dur: 0.09 },
  // a — bowl
  {
    d: "M 215 262 C 193 260 182 275 193 285 C 212 295 228 280 226 268",
    w: 28,
    delay: 2.18,
    dur: 0.1,
  },
  // a — down-stroke
  { d: "M 228 260 L 228 288", w: 24, delay: 2.28, dur: 0.07 },
  // s — single S curve
  {
    d: "M 268 258 C 252 258 245 268 258 276 C 275 279 278 290 260 290 C 248 290 243 283 243 283",
    w: 26,
    delay: 2.37,
    dur: 0.16,
  },
  // h — vertical stem
  { d: "M 285 212 L 285 290", w: 28, delay: 2.55, dur: 0.1 },
  // h — arch
  {
    d: "M 285 258 C 300 248 315 260 315 278 L 315 290",
    w: 25,
    delay: 2.65,
    dur: 0.1,
  },

  // ─── "Homies" ───
  // H — left vertical
  {
    d: "M 82 305 L 82 388",
    w: 30,
    delay: 2.78,
    dur: 0.1,
    tip: { cx: 20.5, cy: 76.25 },
  },
  // H — right vertical
  { d: "M 135 305 L 135 388", w: 30, delay: 2.88, dur: 0.1 },
  // H — crossbar
  { d: "M 82 348 L 135 348", w: 26, delay: 2.98, dur: 0.07 },
  // o — closed loop
  {
    d: "M 160 345 C 140 345 136 370 152 383 C 172 385 182 368 176 352 C 172 345 162 345 160 345",
    w: 26,
    delay: 3.07,
    dur: 0.14,
  },
  // m — vertical stem
  { d: "M 192 388 L 192 348", w: 26, delay: 3.22, dur: 0.07 },
  // m — arch 1
  {
    d: "M 192 348 C 205 342 215 352 215 368 L 215 388",
    w: 24,
    delay: 3.29,
    dur: 0.09,
  },
  // m — arch 2
  {
    d: "M 215 368 C 215 352 228 342 240 348 L 240 388",
    w: 24,
    delay: 3.38,
    dur: 0.09,
  },
  // i — stem
  { d: "M 255 348 L 255 388", w: 24, delay: 3.48, dur: 0.07 },
  // i — dot
  { d: "M 253 326 L 259 330", w: 22, delay: 3.55, dur: 0.05 },
  // e — enclosing curve
  {
    d: "M 300 368 C 300 348 278 348 275 365 C 275 385 298 388 303 378",
    w: 24,
    delay: 3.6,
    dur: 0.12,
  },
  // e — middle bar
  { d: "M 275 363 L 300 363", w: 20, delay: 3.72, dur: 0.06 },
  // s — single S curve
  {
    d: "M 328 352 C 313 352 307 360 321 370 C 337 372 338 382 320 385 C 308 385 302 378 302 378",
    w: 24,
    delay: 3.78,
    dur: 0.14,
  },

  // --- Bottom ornamental flourish ---
  {
    d: "M 52 395 C 150 380 250 380 348 395",
    w: 28,
    delay: 3.95,
    dur: 0.32,
    tip: { cx: 13, cy: 98.75 },
  },
];

/* writing sequence wraps at ~4.3s; everything after that is
   the completion flash, chrome shine and exit fade */
const WRITE_END = 4.3;

/* ─── Main Opening Animation ─── */
export default function OpeningAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"building" | "done">("building");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("done"), 5600);
    return () => {
      clearTimeout(t1);
    };
  }, []);

  return (
    <>
      <div className={phase === "done" ? "" : "overflow-hidden max-h-screen"}>
        {children}
      </div>

      <AnimatePresence>
        {phase === "building" && (
          <motion.div
            key="scene"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] bg-midnight overflow-hidden flex items-center justify-center"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Subtle radial ambient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,107,26,0.12) 0%, rgba(26,15,8,0) 60%)",
              }}
            />

            {/* Ambient pulsing glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.5, 0.35], scale: [0.6, 1.1, 1] }}
              transition={{ duration: 2.8, times: [0, 0.5, 1] }}
              className="absolute w-[500px] h-[500px] bg-sunset/20 rounded-full blur-3xl"
            />

            {/* Rotating dashed ring */}
            <motion.div
              initial={{ scale: 0.4, rotate: 0, opacity: 0 }}
              animate={{
                scale: [0.4, 1, 1, 1.15],
                rotate: [0, 180, 340, 400],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: 3,
                times: [0, 0.35, 0.85, 1],
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-sunset/50"
            />

            {/* Inner chrome ring */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1, 1.1], opacity: [0, 0.3, 0] }}
              transition={{
                duration: 2.8,
                delay: 0.3,
                times: [0, 0.6, 1],
              }}
              className="absolute w-[340px] h-[340px] rounded-full border border-chrome/40"
            />

            {/* Converging sparks */}
            {SPARKS.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const startX = Math.cos(rad) * s.dist;
              const startY = Math.sin(rad) * s.dist;
              return (
                <motion.div
                  key={i}
                  initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1.8, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: s.delay,
                    ease: [0.4, 0, 0.2, 1],
                    times: [0, 0.25, 0.75, 1],
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-sunset"
                  style={{
                    boxShadow:
                      "0 0 12px rgba(255,107,26,0.9), 0 0 24px rgba(255,107,26,0.5)",
                  }}
                />
              );
            })}

            {/* Logo build-up — handwritten brush strokes drawn one after another.
                An SVG mask made of animated calligraphy-like strokes reveals
                the logo in the natural writing order (top flourish → CAR →
                WASH → HOMIES → bottom flourish). `mix-blend-mode: screen`
                on the wrapper knocks out the PNG's black background so no
                square artifact shows against the midnight backdrop. */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: [0.92, 1.03, 1], opacity: [0, 1, 1] }}
              transition={{
                duration: WRITE_END,
                delay: 0.4,
                times: [0, 0.9, 1],
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-64 h-64 md:w-80 md:h-80"
              style={{
                mixBlendMode: "screen",
                filter:
                  "drop-shadow(0 0 55px rgba(255,107,26,0.55)) drop-shadow(0 0 15px rgba(255,107,26,0.4))",
              }}
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <mask
                    id="brushMask"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="400"
                    height="400"
                  >
                    {/* Mask starts fully hidden (black); each stroke paints
                        white in the natural 書き順 of the letters, progressively
                        revealing the logo underneath. */}
                    <rect x="0" y="0" width="400" height="400" fill="black" />
                    {STROKES.map((s, i) => (
                      <motion.path
                        key={i}
                        d={s.d}
                        stroke="white"
                        strokeWidth={s.w}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: s.dur,
                          delay: s.delay,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    ))}
                  </mask>

                  {/* Ink wet-look — boosts vividness behind the reveal */}
                  <filter id="inkBoost" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="0.3" />
                  </filter>
                </defs>

                {/* The actual logo, revealed by the brush mask */}
                <image
                  href="/logo.png"
                  x="0"
                  y="0"
                  width="400"
                  height="400"
                  preserveAspectRatio="xMidYMid meet"
                  mask="url(#brushMask)"
                  filter="url(#inkBoost)"
                />
              </svg>

              {/* Pen-tip glow — a bright dot flashes at the start of each
                  "section" stroke (the flourishes and each capital letter),
                  selling the sense of a calligraphy brush landing before
                  each new row of writing. */}
              {STROKES.filter((s) => s.tip).map((s, i) => (
                <motion.span
                  key={`tip-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.2] }}
                  transition={{ duration: s.dur + 0.15, delay: s.delay }}
                  className="absolute w-3 h-3 rounded-full bg-cream pointer-events-none"
                  style={{
                    left: `${s.tip!.cx}%`,
                    top: `${s.tip!.cy}%`,
                    transform: "translate(-50%, -50%)",
                    boxShadow:
                      "0 0 14px rgba(255,248,240,0.95), 0 0 28px rgba(255,107,26,0.8)",
                  }}
                />
              ))}

              {/* Final chrome shine sweep — only after the logo is fully written */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  WebkitMaskImage: "url(/logo.png)",
                  maskImage: "url(/logo.png)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              >
                <motion.div
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "120%", opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 1.1,
                    delay: WRITE_END + 0.1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>
            </motion.div>

            {/* Completion flash — fires right after the logo finishes assembling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 0.9,
                delay: WRITE_END,
                times: [0, 0.25, 1],
              }}
              className="absolute inset-0 bg-sunset/70 pointer-events-none"
            />

            {/* Top clinic label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute top-[12%] left-0 right-0 text-center px-6"
            >
              <div className="inline-flex items-center gap-3 text-cyan90/80 text-[8px] tracking-[0.3em] uppercase font-pixel">
                <span className="h-[1px] w-8 bg-cyan90/40" />
                Automotive Aesthetic Clinic
                <span className="h-[1px] w-8 bg-cyan90/40" />
              </div>
            </motion.div>

            {/* Bottom progress + caption */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <div className="w-56">
                <div className="w-full h-[1px] bg-chrome/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-sunset rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: WRITE_END + 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center mt-3 text-magenta/80 text-[8px] tracking-[0.3em] uppercase font-pixel"
                >
                  &gt; Drawing Logo...
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
