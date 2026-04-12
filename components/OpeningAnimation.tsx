"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Pre-computed smoke particles (no Math.random for SSR safety) ─── */
const SMOKE = [
  { w: 8, h: 10, left: 46, yEnd: 45, xDrift: -6, dur: 1.8 },
  { w: 12, h: 9, left: 48, yEnd: 38, xDrift: 4, dur: 2.1 },
  { w: 7, h: 11, left: 47, yEnd: 52, xDrift: -10, dur: 1.6 },
  { w: 10, h: 8, left: 49, yEnd: 42, xDrift: 7, dur: 1.9 },
  { w: 9, h: 12, left: 45, yEnd: 48, xDrift: -4, dur: 2.3 },
  { w: 11, h: 7, left: 50, yEnd: 55, xDrift: 8, dur: 1.7 },
];

/* ─── Lowrider SVG — realistic '64 Impala rear view ─── */
function LowriderRear() {
  return (
    <svg
      width="300"
      height="170"
      viewBox="0 0 300 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_60px_rgba(255,107,26,0.3)]"
    >
      <defs>
        {/* Candy red metallic */}
        <linearGradient id="bodyPaint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E83838" />
          <stop offset="35%" stopColor="#CC2222" />
          <stop offset="65%" stopColor="#AA1818" />
          <stop offset="100%" stopColor="#881010" />
        </linearGradient>
        {/* Body top highlight */}
        <linearGradient id="bodyHi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Chrome */}
        <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFFACD" />
          <stop offset="80%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        {/* Bumper chrome */}
        <linearGradient id="bump" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8DCC8" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFF8DC" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B7536" />
        </linearGradient>
        {/* Glass */}
        <linearGradient id="glass" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#4a7a8a" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#6a9aaa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3a5a6a" stopOpacity="0.8" />
        </linearGradient>
        {/* Taillight */}
        <radialGradient id="tl" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FF4444" />
          <stop offset="60%" stopColor="#DD0000" />
          <stop offset="100%" stopColor="#990000" />
        </radialGradient>
        {/* Taillight ambient spill */}
        <radialGradient id="tlSpill">
          <stop offset="0%" stopColor="#FF0000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
        </radialGradient>
        {/* Vinyl top */}
        <linearGradient id="vinyl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1410" />
          <stop offset="100%" stopColor="#0D0906" />
        </linearGradient>
        {/* Tire rubber */}
        <linearGradient id="rubber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="50%" stopColor="#111" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>

      {/* ── Vinyl top ── */}
      <path d="M82 36 L90 10 L210 10 L218 36" fill="url(#vinyl)" stroke="url(#ch)" strokeWidth="0.8" />

      {/* ── Rear window ── */}
      <path d="M92 34 L97 14 L203 14 L208 34" fill="url(#glass)" stroke="#6a9aaa" strokeWidth="1" />
      <line x1="130" y1="15" x2="126" y2="33" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <line x1="170" y1="15" x2="167" y2="33" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* ── Main body ── */}
      <path
        d="M38 95 L38 58 L47 42 L75 34 L225 34 L253 42 L262 58 L262 95"
        fill="url(#bodyPaint)"
        stroke="#771010"
        strokeWidth="1"
      />
      {/* Top highlight */}
      <path d="M47 42 L75 34 L225 34 L253 42 L262 52 L38 52 Z" fill="url(#bodyHi)" />
      {/* Lower shadow */}
      <path d="M38 80 L262 80 L262 95 L38 95 Z" fill="rgba(0,0,0,0.15)" />

      {/* ── Chrome side molding ── */}
      <rect x="38" y="58" width="224" height="3" rx="1" fill="url(#ch)" />
      <line x1="38" y1="62" x2="262" y2="62" stroke="rgba(218,165,32,0.3)" strokeWidth="0.5" />

      {/* ── Trunk details ── */}
      <line x1="95" y1="40" x2="205" y2="40" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
      <circle cx="150" cy="46" r="1.5" fill="url(#ch)" />
      <text
        x="150"
        y="55"
        textAnchor="middle"
        fill="url(#ch)"
        fontSize="5"
        fontFamily="serif"
        letterSpacing="4"
        opacity="0.7"
      >
        IMPALA
      </text>
      <path d="M146 48 L150 46 L154 48 L150 50 Z" fill="url(#ch)" opacity="0.6" />

      {/* ── Triple taillights LEFT ── */}
      <g>
        <rect x="39" y="66" width="14" height="8" rx="2.5" fill="url(#tl)">
          <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="39" y="76" width="14" height="8" rx="2.5" fill="url(#tl)" opacity="0.85">
          <animate attributeName="opacity" values="0.85;0.4;0.85" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
        </rect>
        <rect x="39" y="86" width="14" height="6" rx="2" fill="url(#tl)" opacity="0.65">
          <animate attributeName="opacity" values="0.65;0.25;0.65" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="38" y="65" width="16" height="10" rx="3" stroke="url(#ch)" strokeWidth="1" fill="none" />
        <rect x="38" y="75" width="16" height="10" rx="3" stroke="url(#ch)" strokeWidth="1" fill="none" />
        <rect x="38" y="85" width="16" height="8" rx="2.5" stroke="url(#ch)" strokeWidth="0.8" fill="none" />
        <ellipse cx="46" cy="78" rx="25" ry="18" fill="url(#tlSpill)">
          <animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* ── Triple taillights RIGHT ── */}
      <g>
        <rect x="247" y="66" width="14" height="8" rx="2.5" fill="url(#tl)">
          <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="247" y="76" width="14" height="8" rx="2.5" fill="url(#tl)" opacity="0.85">
          <animate attributeName="opacity" values="0.85;0.4;0.85" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
        </rect>
        <rect x="247" y="86" width="14" height="6" rx="2" fill="url(#tl)" opacity="0.65">
          <animate attributeName="opacity" values="0.65;0.25;0.65" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="246" y="65" width="16" height="10" rx="3" stroke="url(#ch)" strokeWidth="1" fill="none" />
        <rect x="246" y="75" width="16" height="10" rx="3" stroke="url(#ch)" strokeWidth="1" fill="none" />
        <rect x="246" y="85" width="16" height="8" rx="2.5" stroke="url(#ch)" strokeWidth="0.8" fill="none" />
        <ellipse cx="254" cy="78" rx="25" ry="18" fill="url(#tlSpill)">
          <animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* ── Chrome bumper ── */}
      <rect x="33" y="96" width="234" height="13" rx="3" fill="url(#bump)" />
      <line x1="45" y1="100" x2="255" y2="100" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
      <line x1="45" y1="106" x2="255" y2="106" stroke="rgba(139,117,54,0.4)" strokeWidth="0.5" />

      {/* ── License plate ── */}
      <rect x="113" y="78" width="74" height="22" rx="2" fill="#F0F0E8" stroke="url(#ch)" strokeWidth="1.2" />
      <rect x="116" y="80" width="68" height="18" rx="1" stroke="#888" strokeWidth="0.3" fill="none" />
      <text x="150" y="94" textAnchor="middle" fill="#1A0F08" fontSize="10" fontFamily="monospace" fontWeight="bold">
        HOMIES
      </text>

      {/* ── Exhaust ── */}
      <ellipse cx="90" cy="111" rx="5" ry="3" stroke="url(#ch)" strokeWidth="1.2" fill="#0a0a0a" />
      <ellipse cx="90" cy="111" rx="3" ry="1.5" fill="#050505" />

      {/* ── Undercarriage ── */}
      <line x1="33" y1="110" x2="267" y2="110" stroke="#222" strokeWidth="1.5" />

      {/* ── LEFT tire (rear view = narrow vertical, seeing tread) ── */}
      <g>
        <ellipse cx="55" cy="128" rx="9" ry="18" fill="url(#rubber)" />
        <ellipse cx="55" cy="128" rx="9" ry="18" stroke="#2a2a2a" strokeWidth="1.5" fill="none" />
        <ellipse cx="55" cy="128" rx="7" ry="15" stroke="#222" strokeWidth="0.5" fill="none" />
        {/* Whitewall stripe */}
        <ellipse cx="55" cy="128" rx="5.5" ry="13" stroke="#DDDDCC" strokeWidth="2.5" fill="none" opacity="0.55" />
        {/* Rim sliver */}
        <ellipse cx="55" cy="128" rx="3" ry="8" stroke="#DAA520" strokeWidth="0.8" fill="#1a1a1a" />
        <ellipse cx="55" cy="128" rx="1" ry="2.5" fill="#DAA520" opacity="0.6" />
      </g>
      <line x1="55" y1="110" x2="55" y2="115" stroke="url(#ch)" strokeWidth="1.5" />

      {/* ── RIGHT tire ── */}
      <g>
        <ellipse cx="245" cy="128" rx="9" ry="18" fill="url(#rubber)" />
        <ellipse cx="245" cy="128" rx="9" ry="18" stroke="#2a2a2a" strokeWidth="1.5" fill="none" />
        <ellipse cx="245" cy="128" rx="7" ry="15" stroke="#222" strokeWidth="0.5" fill="none" />
        <ellipse cx="245" cy="128" rx="5.5" ry="13" stroke="#DDDDCC" strokeWidth="2.5" fill="none" opacity="0.55" />
        <ellipse cx="245" cy="128" rx="3" ry="8" stroke="#DAA520" strokeWidth="0.8" fill="#1a1a1a" />
        <ellipse cx="245" cy="128" rx="1" ry="2.5" fill="#DAA520" opacity="0.6" />
      </g>
      <line x1="245" y1="110" x2="245" y2="115" stroke="url(#ch)" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Road with perspective ─── */
function Road() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45%] overflow-hidden">
      {/* Asphalt */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2a1f16 0%, #1e150e 40%, #1A0F08 100%)",
        }}
      />
      {/* Center dashes */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-3 origin-bottom"
        style={{ perspective: "200px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-sunset/50 rounded-sm"
            style={{
              width: `${Math.max(2, 8 - i * 0.5)}px`,
              height: `${Math.max(4, 20 - i * 1.5)}px`,
              opacity: Math.max(0.1, 0.6 - i * 0.05),
            }}
            animate={{ y: [0, 20] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "linear",
            }}
          />
        ))}
      </div>
      {/* Road edges */}
      <div
        className="absolute bottom-0 h-full"
        style={{
          left: "15%",
          width: "1px",
          background:
            "linear-gradient(to top, rgba(255,107,26,0.3), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 h-full"
        style={{
          right: "15%",
          width: "1px",
          background:
            "linear-gradient(to top, rgba(255,107,26,0.3), transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─── Exhaust smoke (deterministic) ─── */
function ExhaustSmoke() {
  return (
    <>
      {SMOKE.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-chrome/10"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            left: `${p.left}%`,
            bottom: "28%",
          }}
          animate={{
            y: [0, p.yEnd],
            x: [0, p.xDrift],
            opacity: [0, 0.35, 0],
            scale: [0.5, 2, 3],
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
            {/* ─── Driving Scene ─── */}
            <AnimatePresence>
              {isDriving && (
                <motion.div
                  key="scene"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 z-[100] bg-midnight overflow-hidden"
                >
                  <div className="absolute inset-0 grain pointer-events-none" />

                  {/* Night sky */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0604] via-midnight to-[#2a1f16]" />

                  {/* Stars */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-cream/40 rounded-full"
                      style={{
                        left: `${10 + ((i * 4.3) % 80)}%`,
                        top: `${5 + ((i * 7.1) % 35)}%`,
                      }}
                    />
                  ))}

                  {/* Moon */}
                  <div className="absolute top-[8%] right-[15%] w-8 h-8 rounded-full bg-cream/20 blur-[1px] shadow-[0_0_20px_rgba(255,248,240,0.1)]" />

                  <Road />

                  {phase === "driving" && <ExhaustSmoke />}

                  {/* ── Lowrider ── */}
                  <div className="absolute inset-0 flex items-end justify-center pb-[22%]">
                    <motion.div
                      animate={
                        phase === "departing"
                          ? {
                              scale: [1, 0.06],
                              y: [0, -220],
                              x: 0,
                              opacity: [1, 0.8, 0.3, 0],
                            }
                          : { x: 0 }
                      }
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {/* Perspective wrapper — centered */}
                      <div
                        style={{
                          perspective: 500,
                          perspectiveOrigin: "50% 100%",
                        }}
                      >
                        <motion.div
                          style={{ transformOrigin: "50% 100%" }}
                          animate={
                            phase === "driving"
                              ? {
                                  rotateX: [0, 14, 0, 7, 0, 11, 0, 4, 0],
                                }
                              : { rotateX: 0 }
                          }
                          transition={
                            phase === "driving"
                              ? {
                                  duration: 1.6,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                              : { duration: 0.3 }
                          }
                        >
                          <LowriderRear />
                        </motion.div>
                      </div>

                      {/* Ground shadow */}
                      <motion.div
                        animate={
                          phase === "driving"
                            ? {
                                scaleX: [1, 0.88, 1, 0.92, 1],
                                opacity: [0.25, 0.15, 0.25, 0.18, 0.25],
                              }
                            : { opacity: 0 }
                        }
                        transition={
                          phase === "driving"
                            ? {
                                duration: 1.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : { duration: 0.5 }
                        }
                        className="mx-auto mt-1 w-48 h-3 bg-sunset/25 rounded-full blur-md"
                      />
                    </motion.div>
                  </div>

                  {/* Text overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute top-[8%] left-0 right-0 text-center"
                  >
                    <div className="font-script text-sunset text-xl md:text-2xl tracking-wider drop-shadow-[0_0_20px_rgba(255,107,26,0.4)]">
                      Car Wash Homies
                    </div>
                  </motion.div>

                  {/* Loading bar */}
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <div className="w-48">
                      <div className="w-full h-[2px] bg-midnight-50 rounded-full overflow-hidden">
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
                        className="text-center mt-2 text-chrome/40 text-[10px] tracking-[0.3em] uppercase"
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
