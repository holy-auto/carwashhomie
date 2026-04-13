"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

/* ─── Main Opening Animation ─── */
export default function OpeningAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"building" | "done">("building");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("done"), 4800);
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
                duration: 3.4,
                delay: 0.6,
                times: [0, 0.85, 1],
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
                    {/* Mask starts fully hidden (black) and each stroke
                        paints in white to progressively reveal. */}
                    <rect x="0" y="0" width="400" height="400" fill="black" />

                    {/* Stroke 1 — top flourish swash (quick) */}
                    <motion.path
                      d="M 50 55 Q 200 30 350 55"
                      stroke="white"
                      strokeWidth="38"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.9, ease: "easeOut" }}
                    />

                    {/* Stroke 2 — "CAR" row, deliberate calligraphic pass */}
                    <motion.path
                      d="M 28 125 C 120 95, 260 150, 372 120"
                      stroke="white"
                      strokeWidth="78"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.75, delay: 1.3, ease: [0.5, 0, 0.3, 1] }}
                    />

                    {/* Stroke 3 — "WASH" row */}
                    <motion.path
                      d="M 22 210 C 140 182, 260 238, 378 206"
                      stroke="white"
                      strokeWidth="82"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 2.0, ease: [0.5, 0, 0.3, 1] }}
                    />

                    {/* Stroke 4 — "HOMIES" row */}
                    <motion.path
                      d="M 25 298 C 130 270, 270 326, 375 294"
                      stroke="white"
                      strokeWidth="82"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 2.75, ease: [0.5, 0, 0.3, 1] }}
                    />

                    {/* Stroke 5 — bottom flourish swash */}
                    <motion.path
                      d="M 60 365 Q 200 345 340 365"
                      stroke="white"
                      strokeWidth="40"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 3.5, ease: "easeOut" }}
                    />
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

              {/* Pen-tip glow — a small bright dot that rides each stroke head,
                  sold as the "tip of the calligraphy brush" cue. These are
                  simple timed flashes positioned at each stroke's START point
                  to reinforce the feeling of a pen stroke being laid down. */}
              {[
                { cx: 12.5, cy: 13.75, delay: 0.9, dur: 0.45 },
                { cx: 7, cy: 31.25, delay: 1.3, dur: 0.75 },
                { cx: 5.5, cy: 52.5, delay: 2.0, dur: 0.8 },
                { cx: 6.25, cy: 74.5, delay: 2.75, dur: 0.8 },
                { cx: 15, cy: 91.25, delay: 3.5, dur: 0.5 },
              ].map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.2] }}
                  transition={{ duration: p.dur, delay: p.delay }}
                  className="absolute w-3 h-3 rounded-full bg-cream pointer-events-none"
                  style={{
                    left: `${p.cx}%`,
                    top: `${p.cy}%`,
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
                    duration: 1.2,
                    delay: 4.2,
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
                delay: 3.8,
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
                      duration: 4.2,
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
