"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Pre-computed exhaust particles ─── */
const SMOKE = [
  { w: 10, h: 8, x: 78, yEnd: -35, xDrift: 12, dur: 1.6 },
  { w: 8, h: 10, x: 80, yEnd: -45, xDrift: 18, dur: 1.9 },
  { w: 12, h: 7, x: 76, yEnd: -30, xDrift: 8, dur: 2.1 },
  { w: 7, h: 9, x: 79, yEnd: -40, xDrift: 15, dur: 1.7 },
  { w: 9, h: 11, x: 77, yEnd: -50, xDrift: 20, dur: 2.3 },
];

/* ─── Orange '64 Impala — side view ─── */
function LowriderSide() {
  return (
    <svg
      width="400"
      height="180"
      viewBox="100 160 400 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_40px_rgba(255,107,26,0.25)]"
    >
      {/* Car Shadow */}
      <ellipse cx="300" cy="305" rx="180" ry="12" fill="#000000" opacity="0.4" />

      {/* === MAIN BODY (orange) === */}
      <rect x="140" y="220" width="320" height="50" rx="5" fill="#FF6B1A" />

      {/* Hood slope */}
      <path d="M 140 220 L 150 200 L 210 200 L 220 220 Z" fill="#FF6B1A" />
      {/* Trunk slope */}
      <path d="M 460 220 L 450 200 L 390 200 L 380 220 Z" fill="#FF6B1A" />

      {/* Body highlight (top strip) */}
      <rect x="140" y="220" width="320" height="15" rx="3" fill="#FF8533" opacity="0.4" />

      {/* === ROOF (white/cream) === */}
      <path d="M 210 200 L 220 180 L 380 180 L 390 200 Z" fill="#F5F0E8" />
      <rect x="220" y="180" width="160" height="20" fill="#F5F0E8" />

      {/* Roof chrome trim */}
      <path d="M 210 200 L 220 180 L 380 180 L 390 200" fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.5" />

      {/* === WINDOWS === */}
      {/* Windshield */}
      <path d="M 225 185 L 232 190 L 232 215 L 225 215 Z" fill="#1a1a1a" opacity="0.92" />
      {/* Front side window */}
      <rect x="234" y="190" width="64" height="25" rx="1" fill="#1a1a1a" opacity="0.88" />
      {/* B-pillar */}
      <rect x="300" y="188" width="4" height="27" fill="#F5F0E8" />
      {/* Rear side window */}
      <rect x="306" y="190" width="60" height="25" rx="1" fill="#1a1a1a" opacity="0.88" />
      {/* C-pillar / rear window edge */}
      <path d="M 368 190 L 375 185 L 375 215 L 368 215 Z" fill="#1a1a1a" opacity="0.85" />

      {/* Window chrome surrounds */}
      <path d="M 225 185 L 232 190 L 298 190 L 298 215 L 225 215 Z" fill="none" stroke="#DAA520" strokeWidth="0.8" opacity="0.4" />
      <rect x="306" y="190" width="60" height="25" rx="1" fill="none" stroke="#DAA520" strokeWidth="0.8" opacity="0.4" />

      {/* === CHROME BELTLINE === */}
      <rect x="140" y="217" width="320" height="3" rx="1" fill="url(#chBelt)" />
      <defs>
        <linearGradient id="chBelt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="50%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="chBump" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8DCC8" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFF8DC" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B7536" />
        </linearGradient>
        <radialGradient id="tireFill">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="80%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
      </defs>

      {/* Lower chrome / rocker trim */}
      <rect x="140" y="268" width="320" height="2" rx="1" fill="#DAA520" opacity="0.6" />

      {/* === BODY PINSTRIPES (cream) === */}
      <line x1="142" y1="238" x2="458" y2="238" stroke="#FFF8F0" strokeWidth="2" opacity="0.6" />
      <line x1="142" y1="255" x2="458" y2="255" stroke="#FFF8F0" strokeWidth="2" opacity="0.6" />

      {/* === FRONT BUMPER === */}
      <rect x="132" y="208" width="10" height="62" rx="4" fill="url(#chBump)" />

      {/* === REAR BUMPER === */}
      <rect x="458" y="208" width="10" height="62" rx="4" fill="url(#chBump)" />

      {/* === HEADLIGHTS === */}
      <circle cx="145" cy="230" r="6" fill="#FFFDE0" stroke="#DAA520" strokeWidth="0.8" />
      <circle cx="145" cy="230" r="3" fill="#FFF" opacity="0.7" />
      {/* Turn signal */}
      <circle cx="145" cy="250" r="5" fill="#FF6B1A" opacity="0.6" stroke="#DAA520" strokeWidth="0.6" />

      {/* === TAILLIGHTS (triple Impala style) === */}
      <rect x="455" y="225" width="6" height="8" rx="2" fill="#FF2222">
        <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <rect x="455" y="235" width="6" height="8" rx="2" fill="#DD0000" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
      </rect>
      <rect x="455" y="245" width="6" height="8" rx="2" fill="#CC0000" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
      </rect>
      {/* Taillight chrome bezels */}
      <rect x="454" y="224" width="8" height="10" rx="2.5" fill="none" stroke="#DAA520" strokeWidth="0.7" />
      <rect x="454" y="234" width="8" height="10" rx="2.5" fill="none" stroke="#DAA520" strokeWidth="0.7" />
      <rect x="454" y="244" width="8" height="10" rx="2.5" fill="none" stroke="#DAA520" strokeWidth="0.7" />

      {/* === DOOR LINE === */}
      <line x1="300" y1="200" x2="300" y2="268" stroke="#E55300" strokeWidth="0.8" opacity="0.35" />

      {/* === DOOR HANDLE === */}
      <rect x="310" y="237" width="14" height="3" rx="1.5" fill="#DAA520" />

      {/* === FRONT WHEEL === */}
      <g>
        {/* Tire */}
        <circle cx="200" cy="275" r="30" fill="#3a3a3a" />
        <circle cx="200" cy="275" r="28" fill="none" stroke="#EEEEDD" strokeWidth="4" />
        <circle cx="200" cy="275" r="25" fill="url(#tireFill)" />
        {/* Rim */}
        <circle cx="200" cy="275" r="15" fill="#333" stroke="#DAA520" strokeWidth="1" />
        {/* Wire spokes */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a) => (
          <line
            key={a}
            x1={200 + Math.cos((a * Math.PI) / 180) * 4}
            y1={275 + Math.sin((a * Math.PI) / 180) * 4}
            x2={200 + Math.cos((a * Math.PI) / 180) * 14}
            y2={275 + Math.sin((a * Math.PI) / 180) * 14}
            stroke="#DAA520"
            strokeWidth="0.5"
            opacity="0.7"
          />
        ))}
        {/* Center cap / knock-off */}
        <circle cx="200" cy="275" r="6" fill="#444" stroke="#DAA520" strokeWidth="1.2" />
        <circle cx="200" cy="275" r="3" fill="#DAA520" opacity="0.6" />
      </g>

      {/* === REAR WHEEL === */}
      <g>
        <circle cx="400" cy="275" r="30" fill="#3a3a3a" />
        <circle cx="400" cy="275" r="28" fill="none" stroke="#EEEEDD" strokeWidth="4" />
        <circle cx="400" cy="275" r="25" fill="url(#tireFill)" />
        <circle cx="400" cy="275" r="15" fill="#333" stroke="#DAA520" strokeWidth="1" />
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a) => (
          <line
            key={a}
            x1={400 + Math.cos((a * Math.PI) / 180) * 4}
            y1={275 + Math.sin((a * Math.PI) / 180) * 4}
            x2={400 + Math.cos((a * Math.PI) / 180) * 14}
            y2={275 + Math.sin((a * Math.PI) / 180) * 14}
            stroke="#DAA520"
            strokeWidth="0.5"
            opacity="0.7"
          />
        ))}
        <circle cx="400" cy="275" r="6" fill="#444" stroke="#DAA520" strokeWidth="1.2" />
        <circle cx="400" cy="275" r="3" fill="#DAA520" opacity="0.6" />
      </g>

      {/* Wheel well chrome arcs */}
      <path d="M 170 270 A 30 30 0 0 1 230 270" fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.4" />
      <path d="M 370 270 A 30 30 0 0 1 430 270" fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/* ─── City silhouette background ─── */
function CitySilhouette() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none" style={{ bottom: "28%" }}>
      <svg
        width="500"
        height="220"
        viewBox="150 40 350 230"
        fill="none"
        opacity="0.2"
      >
        <rect x="180" y="80" width="40" height="190" fill="#3a3a3a" />
        <rect x="230" y="100" width="35" height="170" fill="#3a3a3a" />
        <rect x="275" y="50" width="50" height="220" fill="#3a3a3a" />
        <rect x="335" y="70" width="45" height="200" fill="#3a3a3a" />
        <rect x="390" y="90" width="38" height="180" fill="#3a3a3a" />
        <rect x="438" y="110" width="32" height="160" fill="#3a3a3a" />
        {/* Window lights */}
        {[190, 240, 290, 345, 400].map((bx, bi) =>
          [0, 1, 2, 3, 4].map((row) => (
            <rect
              key={`${bi}-${row}`}
              x={bx + 5}
              y={90 + bi * 10 + row * 28}
              width="4"
              height="6"
              fill="#FF6B1A"
              opacity={0.15 + (bi + row) * 0.04}
            />
          ))
        )}
      </svg>
    </div>
  );
}

/* ─── Exhaust smoke ─── */
function ExhaustSmoke() {
  return (
    <>
      {SMOKE.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-chrome/8"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            right: `${p.x - 76}%`,
            bottom: "30%",
          }}
          animate={{
            y: [0, p.yEnd],
            x: [0, p.xDrift],
            opacity: [0, 0.3, 0],
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
            {/* ─── Driving Scene ─── */}
            <AnimatePresence>
              {isDriving && (
                <motion.div
                  key="scene"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 z-[100] bg-[#4a4a4a] overflow-hidden"
                >
                  <div className="absolute inset-0 grain pointer-events-none" />

                  {/* Sky gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3a] via-[#4a4a4a] to-[#555]" />

                  {/* City silhouette */}
                  <CitySilhouette />

                  {/* Ground */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: "28%",
                      background: "linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 100%)",
                    }}
                  />
                  <div className="absolute bottom-[28%] left-0 right-0 h-px bg-white/5" />

                  {/* Exhaust */}
                  {phase === "driving" && <ExhaustSmoke />}

                  {/* ── Lowrider ── */}
                  <div className="absolute inset-0 flex items-end justify-center pb-[20%]">
                    <motion.div
                      animate={
                        phase === "departing"
                          ? {
                              x: [0, -100, -900],
                              opacity: [1, 1, 0],
                            }
                          : { x: 0 }
                      }
                      transition={{
                        duration: 1.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {/* Front-end hop — rear axle stays planted */}
                      <motion.div
                        style={{ transformOrigin: "67% 90%" }}
                        animate={
                          phase === "driving"
                            ? {
                                rotate: [0, -5, 0, -2.5, 0, -4, 0, -1.5, 0],
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
                    <div className="font-script text-sunset text-xl md:text-2xl tracking-wider drop-shadow-[0_0_20px_rgba(255,107,26,0.4)]">
                      Car Wash Homies
                    </div>
                  </motion.div>

                  {/* Loading bar */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <div className="w-48">
                      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
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
                        className="text-center mt-2 text-white/30 text-[10px] tracking-[0.3em] uppercase"
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
