"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Exhaust particles ─── */
const SMOKE = [
  { w: 10, h: 8, yEnd: -35, xDrift: 14, dur: 1.6 },
  { w: 8, h: 10, yEnd: -45, xDrift: 20, dur: 1.9 },
  { w: 12, h: 7, yEnd: -30, xDrift: 10, dur: 2.1 },
  { w: 7, h: 9, yEnd: -40, xDrift: 16, dur: 1.7 },
  { w: 9, h: 11, yEnd: -50, xDrift: 22, dur: 2.3 },
];

/* ─── '59 Impala side view — orange, tail fins ─── */
function LowriderSide() {
  return (
    <svg
      width="480"
      height="160"
      viewBox="0 0 480 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8A3A" />
          <stop offset="40%" stopColor="#FF6B1A" />
          <stop offset="100%" stopColor="#E05500" />
        </linearGradient>
        <linearGradient id="lowerBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0D0D0" />
          <stop offset="50%" stopColor="#B8B8B8" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8E4DC" />
        </linearGradient>
        <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="30%" stopColor="#D8D8D8" />
          <stop offset="50%" stopColor="#F8F8F8" />
          <stop offset="70%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient id="chGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      {/* Ground shadow line */}
      <line x1="30" y1="140" x2="465" y2="140" stroke="#1a1a1a" strokeWidth="2" />
      <ellipse cx="250" cy="142" rx="200" ry="5" fill="rgba(0,0,0,0.2)" />

      {/* === LOWER BODY (silver panel below chrome line) === */}
      <path
        d="
          M 32 88 L 455 88 L 455 115
          L 400 115 A 25 25 0 0 1 350 115
          L 125 115 A 25 25 0 0 1 75 115
          L 32 115 Z
        "
        fill="url(#lowerBody)"
        stroke="#222"
        strokeWidth="1.2"
      />

      {/* === UPPER BODY + TAIL FINS === */}
      <path
        d="
          M 32 88
          L 32 72
          L 28 70
          L 35 68
          L 142 64
          L 155 64
          L 155 88
          Z
        "
        fill="url(#body)"
        stroke="#222"
        strokeWidth="1.2"
      />
      <path
        d="
          M 155 64
          L 370 64
          L 380 62
          L 420 56
          L 442 48
          L 450 48
          L 452 52
          L 448 62
          L 455 68
          L 455 88
          L 155 88
          Z
        "
        fill="url(#body)"
        stroke="#222"
        strokeWidth="1.2"
      />
      {/* Hood section fill */}
      <path
        d="M 32 72 L 35 68 L 142 64 L 155 64 L 155 88 L 32 88 Z"
        fill="url(#body)"
      />

      {/* Body top highlight */}
      <path
        d="M 35 68 L 142 64 L 420 56 L 442 48 L 450 48 L 452 52 L 448 62 L 455 68 L 455 72 L 32 72 Z"
        fill="rgba(255,255,255,0.08)"
      />

      {/* === CHROME SPEAR (horizontal trim line) === */}
      <line x1="30" y1="88" x2="455" y2="88" stroke="url(#ch)" strokeWidth="3" />
      <line x1="30" y1="86" x2="455" y2="86" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />

      {/* === ROOF (white) === */}
      <path
        d="
          M 155 64
          L 165 40
          L 175 32
          L 335 30
          L 350 34
          L 365 56
          L 370 64
          L 155 64
          Z
        "
        fill="url(#roof)"
        stroke="#222"
        strokeWidth="1.2"
      />

      {/* Roof chrome trim */}
      <path
        d="M 165 40 L 175 32 L 335 30 L 350 34 L 365 56"
        fill="none"
        stroke="#aaa"
        strokeWidth="1.5"
      />

      {/* === WINDOWS === */}
      {/* Windshield */}
      <path d="M 157 62 L 167 42 L 180 34 L 180 60 Z" fill="#1a1a1a" opacity="0.9" />
      {/* Front side window */}
      <path d="M 183 34 L 265 32 L 265 60 L 183 60 Z" fill="#1a1a1a" opacity="0.85" />
      {/* B-pillar */}
      <rect x="265" y="31" width="5" height="30" fill="url(#roof)" stroke="#222" strokeWidth="0.5" />
      {/* Rear side window */}
      <path d="M 272 32 L 333 31 L 348 35 L 362 56 L 272 60 Z" fill="#1a1a1a" opacity="0.85" />
      {/* Window chrome outlines */}
      <path d="M 157 62 L 167 42 L 180 34 L 265 32 L 265 60" fill="none" stroke="#aaa" strokeWidth="0.8" />
      <path d="M 272 32 L 333 31 L 348 35 L 362 56 L 272 60" fill="none" stroke="#aaa" strokeWidth="0.8" />

      {/* A-pillar vent / chrome detail */}
      <line x1="155" y1="64" x2="160" y2="55" stroke="#aaa" strokeWidth="1.5" />

      {/* === TAIL FIN DETAIL === */}
      {/* Fin chrome trim */}
      <line x1="380" y1="62" x2="450" y2="48" stroke="#aaa" strokeWidth="1" />
      {/* Tail fin tip accent */}
      <path d="M 442 48 L 450 48 L 452 52 L 448 52 Z" fill="#DD0000" stroke="#222" strokeWidth="0.8" />

      {/* === TAILLIGHTS (in the fin) === */}
      <ellipse cx="449" cy="56" rx="3" ry="5" fill="#FF2222" stroke="#222" strokeWidth="0.8">
        <animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="452" cy="62" rx="2.5" ry="4" fill="#DD0000" opacity="0.7" stroke="#222" strokeWidth="0.6">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.8s" begin="0.2s" repeatCount="indefinite" />
      </ellipse>

      {/* === REAR CHROME BUMPER === */}
      <path d="M 453 68 L 460 68 L 462 72 L 462 112 L 460 115 L 453 115 Z" fill="url(#ch)" stroke="#222" strokeWidth="0.8" />
      {/* Rear bumper guard */}
      <rect x="456" y="78" width="4" height="28" rx="2" fill="url(#ch)" stroke="#888" strokeWidth="0.5" />

      {/* === FRONT CHROME BUMPER === */}
      <path d="M 28 70 L 22 72 L 20 76 L 20 112 L 22 115 L 32 115 L 32 72 Z" fill="url(#ch)" stroke="#222" strokeWidth="0.8" />
      {/* Front bumper guard */}
      <rect x="22" y="80" width="4" height="26" rx="2" fill="url(#ch)" stroke="#888" strokeWidth="0.5" />

      {/* === HEADLIGHTS === */}
      <ellipse cx="30" cy="74" rx="5" ry="4" fill="#FFFDE0" stroke="#222" strokeWidth="0.8" />
      <ellipse cx="30" cy="74" rx="2.5" ry="2" fill="#fff" opacity="0.8" />

      {/* === DOOR LINE === */}
      <line x1="265" y1="64" x2="265" y2="114" stroke="#222" strokeWidth="0.8" opacity="0.3" />

      {/* === DOOR HANDLE === */}
      <rect x="240" y="76" width="10" height="2.5" rx="1" fill="url(#ch)" stroke="#888" strokeWidth="0.3" />

      {/* === FRONT WHEEL === */}
      <g>
        <circle cx="100" cy="122" r="25" fill="#111" stroke="#222" strokeWidth="1.5" />
        {/* Whitewall */}
        <circle cx="100" cy="122" r="22" fill="none" stroke="#F0F0E8" strokeWidth="4" />
        {/* Inner tire */}
        <circle cx="100" cy="122" r="19" fill="#1a1a1a" />
        {/* Wire wheel rim */}
        <circle cx="100" cy="122" r="13" fill="#2a2a2a" stroke="#C0C0C0" strokeWidth="0.8" />
        {/* Wire spokes (dense, like reference) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 3}
              y1={122 + Math.sin(a) * 3}
              x2={100 + Math.cos(a) * 12}
              y2={122 + Math.sin(a) * 12}
              stroke="#C0C0C0"
              strokeWidth="0.4"
            />
          );
        })}
        {/* Outer spoke ring */}
        <circle cx="100" cy="122" r="12" fill="none" stroke="#C0C0C0" strokeWidth="0.3" />
        <circle cx="100" cy="122" r="8" fill="none" stroke="#C0C0C0" strokeWidth="0.3" />
        {/* Center hub */}
        <circle cx="100" cy="122" r="4.5" fill="#D0D0D0" stroke="#999" strokeWidth="0.8" />
        <circle cx="100" cy="122" r="2" fill="#E8E8E8" />
      </g>

      {/* === REAR WHEEL === */}
      <g>
        <circle cx="375" cy="122" r="25" fill="#111" stroke="#222" strokeWidth="1.5" />
        <circle cx="375" cy="122" r="22" fill="none" stroke="#F0F0E8" strokeWidth="4" />
        <circle cx="375" cy="122" r="19" fill="#1a1a1a" />
        <circle cx="375" cy="122" r="13" fill="#2a2a2a" stroke="#C0C0C0" strokeWidth="0.8" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={375 + Math.cos(a) * 3}
              y1={122 + Math.sin(a) * 3}
              x2={375 + Math.cos(a) * 12}
              y2={122 + Math.sin(a) * 12}
              stroke="#C0C0C0"
              strokeWidth="0.4"
            />
          );
        })}
        <circle cx="375" cy="122" r="12" fill="none" stroke="#C0C0C0" strokeWidth="0.3" />
        <circle cx="375" cy="122" r="8" fill="none" stroke="#C0C0C0" strokeWidth="0.3" />
        <circle cx="375" cy="122" r="4.5" fill="#D0D0D0" stroke="#999" strokeWidth="0.8" />
        <circle cx="375" cy="122" r="2" fill="#E8E8E8" />
      </g>
    </svg>
  );
}

/* ─── Exhaust smoke ─── */
function ExhaustSmoke() {
  return (
    <>
      {SMOKE.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            right: "16%",
            bottom: "32%",
          }}
          animate={{
            y: [0, p.yEnd],
            x: [0, p.xDrift],
            opacity: [0, 0.2, 0],
            scale: [0.5, 2, 3.5],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

/* ─── Hospital Door Panel ─── */
function DoorPanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute inset-0 bg-cream ${isLeft ? "border-r-2" : "border-l-2"} border-sunset/20`}
    >
      <div className="absolute inset-4 border border-midnight/10 rounded-lg" />
      <div
        className={`absolute top-1/4 bottom-1/3 bg-sunset/5 border border-midnight/10 rounded-md ${
          isLeft ? "left-1/4 right-8" : "right-1/4 left-8"
        }`}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 flex flex-col gap-4 ${
          isLeft ? "right-8 items-end" : "left-8 items-start"
        }`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="20" rx="1" fill="#FF6B1A" />
          <rect x="2" y="9" width="20" height="6" rx="1" fill="#FF6B1A" />
        </svg>
        <div className="text-midnight/50 text-sm tracking-[0.3em] font-semibold [writing-mode:vertical-rl]">
          {isLeft ? "車の美容外科" : "Car Wash Homies"}
        </div>
      </div>
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-20 bg-sunset/40 rounded-full ${
          isLeft ? "right-3" : "left-3"
        }`}
      />
    </div>
  );
}

/* ─── Main Opening Animation ─── */
export default function OpeningAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<
    "driving" | "departing" | "doors-closed" | "doors-open" | "done"
  >("driving");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("departing"), 3000);
    const t2 = setTimeout(() => setPhase("doors-closed"), 4200);
    const t3 = setTimeout(() => setPhase("doors-open"), 6500);
    const t4 = setTimeout(() => setPhase("done"), 7800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const isDriving = phase === "driving" || phase === "departing";

  return (
    <>
      <div className={phase === "done" ? "" : "overflow-hidden max-h-screen"}>
        {children}
      </div>

      <AnimatePresence>
        {phase !== "done" && (
          <>
            <AnimatePresence>
              {isDriving && (
                <motion.div
                  key="scene"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 z-[100] overflow-hidden"
                  style={{ background: "#D6EBF2" }}
                >
                  <div className="absolute inset-0 grain pointer-events-none" />

                  {/* Light sky background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #C8E4F0 0%, #D6EBF2 60%, #E0EEF4 100%)",
                    }}
                  />

                  {/* Ground */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: "25%",
                      background: "#D0DDE4",
                    }}
                  />
                  <div className="absolute bottom-[25%] left-0 right-0 h-px bg-black/10" />

                  {/* Exhaust */}
                  {phase === "driving" && <ExhaustSmoke />}

                  {/* ── Lowrider ── */}
                  <div className="absolute inset-0 flex items-end justify-center pb-[20%]">
                    <motion.div
                      animate={
                        phase === "departing"
                          ? {
                              x: [0, -80, -900],
                              opacity: [1, 1, 0],
                            }
                          : { x: 0 }
                      }
                      transition={{
                        duration: 1.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {/* Front-end hop — rear axle planted */}
                      <motion.div
                        style={{ transformOrigin: "78% 87%" }}
                        animate={
                          phase === "driving"
                            ? {
                                rotate: [
                                  0, -4, 0, -2, 0, -3.5, 0, -1.5, 0,
                                ],
                              }
                            : { rotate: 0 }
                        }
                        transition={
                          phase === "driving"
                            ? {
                                duration: 1.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : { duration: 0.3 }
                        }
                      >
                        <LowriderSide />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute top-[10%] left-0 right-0 text-center"
                  >
                    <div className="font-script text-sunset text-2xl md:text-3xl tracking-wider drop-shadow-[0_0_20px_rgba(255,107,26,0.3)]">
                      Car Wash Homies
                    </div>
                  </motion.div>

                  {/* Loading bar */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <div className="w-48">
                      <div className="w-full h-[2px] bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-sunset-gradient rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 2.8,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-2 text-midnight/30 text-[10px] tracking-[0.3em] uppercase"
                      >
                        Entering the Clinic...
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Hospital Doors ─── */}
            {(phase === "doors-closed" || phase === "doors-open") && (
              <>
                <motion.div
                  key="door-left"
                  initial={{ x: "0%", opacity: 0 }}
                  animate={
                    phase === "doors-open"
                      ? { x: "-100%", opacity: 1 }
                      : { x: "0%", opacity: 1 }
                  }
                  transition={
                    phase === "doors-open"
                      ? { duration: 1.1, ease: [0.65, 0, 0.35, 1] }
                      : { duration: 0.4, ease: "easeOut" }
                  }
                  className="fixed top-0 left-0 w-1/2 h-full z-[99] bg-cream"
                >
                  <DoorPanel side="left" />
                </motion.div>

                <motion.div
                  key="door-right"
                  initial={{ x: "0%", opacity: 0 }}
                  animate={
                    phase === "doors-open"
                      ? { x: "100%", opacity: 1 }
                      : { x: "0%", opacity: 1 }
                  }
                  transition={
                    phase === "doors-open"
                      ? { duration: 1.1, ease: [0.65, 0, 0.35, 1] }
                      : { duration: 0.4, ease: "easeOut" }
                  }
                  className="fixed top-0 right-0 w-1/2 h-full z-[99] bg-cream"
                >
                  <DoorPanel side="right" />
                </motion.div>

                {phase === "doors-closed" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="fixed top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-[100] bg-sunset/30"
                  />
                )}

                {phase === "doors-open" && (
                  <motion.div
                    key="burst"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="fixed inset-0 z-[98] bg-sunset/10 pointer-events-none"
                  />
                )}
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
