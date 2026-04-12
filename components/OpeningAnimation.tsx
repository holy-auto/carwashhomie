"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Pre-computed smoke particles ─── */
const SMOKE = [
  { w: 10, h: 8, x: 82, yEnd: -35, xDrift: 12, dur: 1.6 },
  { w: 8, h: 10, x: 85, yEnd: -45, xDrift: 18, dur: 1.9 },
  { w: 12, h: 7, x: 80, yEnd: -30, xDrift: 8, dur: 2.1 },
  { w: 7, h: 9, x: 84, yEnd: -40, xDrift: 15, dur: 1.7 },
  { w: 9, h: 11, x: 81, yEnd: -50, xDrift: 20, dur: 2.3 },
];

/* ─── '64 Impala side view — orange lowrider ─── */
function LowriderSide() {
  return (
    <svg
      width="380"
      height="150"
      viewBox="0 0 380 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_50px_rgba(255,107,26,0.25)]"
    >
      <defs>
        {/* Orange candy paint */}
        <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF9040" />
          <stop offset="35%" stopColor="#FF6B1A" />
          <stop offset="70%" stopColor="#E55A10" />
          <stop offset="100%" stopColor="#CC4E00" />
        </linearGradient>
        {/* Body highlight */}
        <linearGradient id="paintHi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Cream/white roof */}
        <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8F4EC" />
          <stop offset="100%" stopColor="#E8E0D0" />
        </linearGradient>
        {/* Chrome */}
        <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="25%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFFACD" />
          <stop offset="75%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        {/* Bumper */}
        <linearGradient id="bump" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8DCC8" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFF8DC" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#8B7536" />
        </linearGradient>
        {/* Tire */}
        <radialGradient id="tire">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="70%" stopColor="#111" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        {/* Taillight */}
        <radialGradient id="tl" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FF4444" />
          <stop offset="60%" stopColor="#DD0000" />
          <stop offset="100%" stopColor="#990000" />
        </radialGradient>
        {/* Headlight */}
        <radialGradient id="hl">
          <stop offset="0%" stopColor="#FFFDE0" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* ── Ground shadow ── */}
      <ellipse cx="195" cy="138" rx="170" ry="7" fill="rgba(0,0,0,0.4)" />

      {/* ── BODY (full shape with wheel wells) ── */}
      <path
        d="
          M 32 98
          L 32 62
          L 38 56
          L 125 52
          L 135 33
          L 142 27
          L 275 24
          L 295 27
          L 305 33
          L 318 50
          L 355 54
          L 362 58
          L 362 98
          L 324 98
          A 22 22 0 0 1 280 98
          L 118 98
          A 22 22 0 0 1 74 98
          L 32 98
          Z
        "
        fill="url(#paint)"
        stroke="#B84200"
        strokeWidth="0.8"
      />

      {/* Body top highlight */}
      <path
        d="M 38 56 L 125 52 L 355 54 L 362 58 L 362 68 L 32 68 L 32 62 Z"
        fill="url(#paintHi)"
      />

      {/* Lower body shadow */}
      <path
        d="M 32 85 L 362 85 L 362 98 L 324 98 A 22 22 0 0 1 280 98 L 118 98 A 22 22 0 0 1 74 98 L 32 98 Z"
        fill="rgba(0,0,0,0.12)"
      />

      {/* ── ROOF (cream) ── */}
      <path
        d="
          M 125 52
          L 135 33
          L 142 27
          L 275 24
          L 295 27
          L 305 33
          L 318 50
          L 125 50
          Z
        "
        fill="url(#roof)"
        stroke="url(#ch)"
        strokeWidth="0.6"
      />

      {/* ── WINDOWS ── */}
      {/* Windshield */}
      <path d="M 127 51 L 137 34 L 167 30 L 167 49 Z" fill="#1a1a1a" opacity="0.92" />
      {/* Front side window */}
      <path d="M 170 30 L 228 27 L 228 48 L 170 49 Z" fill="#1a1a1a" opacity="0.88" />
      {/* B-pillar */}
      <line x1="228" y1="27" x2="228" y2="48" stroke="url(#ch)" strokeWidth="2" />
      {/* Rear side window */}
      <path d="M 231 27 L 274 25 L 293 28 L 305 34 L 316 48 L 231 48 Z" fill="#1a1a1a" opacity="0.88" />

      {/* Window chrome trim */}
      <path
        d="M 127 51 L 137 34 L 167 30 L 228 27 L 274 25 L 293 28 L 305 34 L 318 50"
        stroke="url(#ch)"
        strokeWidth="1"
        fill="none"
      />

      {/* ── CHROME BELTLINE ── */}
      <line x1="32" y1="54" x2="362" y2="54" stroke="url(#ch)" strokeWidth="2.5" />

      {/* ── BODY PINSTRIPES (cream, like reference) ── */}
      <line x1="34" y1="68" x2="360" y2="68" stroke="#FFF8F0" strokeWidth="1.8" opacity="0.7" />
      <line x1="34" y1="86" x2="360" y2="86" stroke="#FFF8F0" strokeWidth="1.8" opacity="0.7" />

      {/* ── FRONT CHROME BUMPER ── */}
      <rect x="24" y="56" width="10" height="44" rx="3" fill="url(#bump)" />
      <line x1="29" y1="60" x2="29" y2="96" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

      {/* ── REAR CHROME BUMPER ── */}
      <rect x="360" y="56" width="10" height="44" rx="3" fill="url(#bump)" />
      <line x1="365" y1="60" x2="365" y2="96" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

      {/* ── HEADLIGHT ── */}
      <rect x="32" y="58" width="14" height="9" rx="2" fill="url(#hl)" stroke="url(#ch)" strokeWidth="0.6" />

      {/* ── TAILLIGHTS ── */}
      <g>
        <rect x="356" y="58" width="6" height="10" rx="1.5" fill="url(#tl)">
          <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="356" y="70" width="6" height="8" rx="1.5" fill="url(#tl)" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
        </rect>
        <rect x="356" y="80" width="6" height="6" rx="1" fill="url(#tl)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        {/* Chrome bezels */}
        <rect x="355" y="57" width="8" height="12" rx="2" stroke="url(#ch)" strokeWidth="0.7" fill="none" />
        <rect x="355" y="69" width="8" height="10" rx="2" stroke="url(#ch)" strokeWidth="0.7" fill="none" />
        <rect x="355" y="79" width="8" height="8" rx="1.5" stroke="url(#ch)" strokeWidth="0.6" fill="none" />
      </g>

      {/* ── DOOR LINE ── */}
      <line x1="200" y1="51" x2="200" y2="96" stroke="#B84200" strokeWidth="0.8" opacity="0.4" />

      {/* ── DOOR HANDLE ── */}
      <rect x="212" y="68" width="14" height="3" rx="1.5" fill="url(#ch)" />

      {/* ── GAS CAP ── */}
      <circle cx="340" cy="68" r="2.5" stroke="url(#ch)" strokeWidth="0.6" fill="#CC4E00" />

      {/* ── FRONT WHEEL ── */}
      <g>
        <circle cx="96" cy="108" r="22" fill="url(#tire)" />
        <circle cx="96" cy="108" r="22" stroke="#0a0a0a" strokeWidth="1.2" fill="none" />
        {/* Whitewall */}
        <circle cx="96" cy="108" r="18" stroke="#EEEEDD" strokeWidth="4" fill="none" opacity="0.7" />
        {/* Rim */}
        <circle cx="96" cy="108" r="13" fill="#1a1a1a" stroke="url(#ch)" strokeWidth="1" />
        {/* Wire spokes */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a) => (
          <line
            key={a}
            x1={96 + Math.cos((a * Math.PI) / 180) * 3}
            y1={108 + Math.sin((a * Math.PI) / 180) * 3}
            x2={96 + Math.cos((a * Math.PI) / 180) * 12}
            y2={108 + Math.sin((a * Math.PI) / 180) * 12}
            stroke="#DAA520"
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
        {/* Center cap / knock-off */}
        <circle cx="96" cy="108" r="5" fill="#333" stroke="url(#ch)" strokeWidth="1" />
        <circle cx="96" cy="108" r="2.5" fill="url(#ch)" opacity="0.7" />
      </g>

      {/* ── REAR WHEEL ── */}
      <g>
        <circle cx="300" cy="108" r="22" fill="url(#tire)" />
        <circle cx="300" cy="108" r="22" stroke="#0a0a0a" strokeWidth="1.2" fill="none" />
        <circle cx="300" cy="108" r="18" stroke="#EEEEDD" strokeWidth="4" fill="none" opacity="0.7" />
        <circle cx="300" cy="108" r="13" fill="#1a1a1a" stroke="url(#ch)" strokeWidth="1" />
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a) => (
          <line
            key={a}
            x1={300 + Math.cos((a * Math.PI) / 180) * 3}
            y1={108 + Math.sin((a * Math.PI) / 180) * 3}
            x2={300 + Math.cos((a * Math.PI) / 180) * 12}
            y2={108 + Math.sin((a * Math.PI) / 180) * 12}
            stroke="#DAA520"
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
        <circle cx="300" cy="108" r="5" fill="#333" stroke="url(#ch)" strokeWidth="1" />
        <circle cx="300" cy="108" r="2.5" fill="url(#ch)" opacity="0.7" />
      </g>

      {/* ── Wheel well chrome trim ── */}
      <path d="M 74 98 A 22 22 0 0 1 118 98" stroke="url(#ch)" strokeWidth="1" fill="none" />
      <path d="M 278 98 A 22 22 0 0 1 322 98" stroke="url(#ch)" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ─── Exhaust smoke (side view — exits from rear) ─── */
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
            right: `${p.x - 80}%`,
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
                  <div className="absolute top-[10%] right-[18%] w-8 h-8 rounded-full bg-cream/20 blur-[1px] shadow-[0_0_20px_rgba(255,248,240,0.1)]" />

                  {/* Ground / road line */}
                  <div className="absolute bottom-[28%] left-0 right-0 h-px bg-sunset/20" />
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: "28%",
                      background:
                        "linear-gradient(180deg, #2a1f16 0%, #1e150e 50%, #1A0F08 100%)",
                    }}
                  />

                  {/* Exhaust smoke */}
                  {phase === "driving" && <ExhaustSmoke />}

                  {/* ── Lowrider ── */}
                  <div className="absolute inset-0 flex items-end justify-center pb-[24%]">
                    <motion.div
                      animate={
                        phase === "departing"
                          ? {
                              x: [0, -100, -800],
                              opacity: [1, 1, 0],
                            }
                          : { x: 0 }
                      }
                      transition={{
                        duration: 1.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {/* Hop animation — front lifts, rear stays planted */}
                      <motion.div
                        style={{ transformOrigin: "79% 85%" }}
                        animate={
                          phase === "driving"
                            ? {
                                rotate: [
                                  0, -6, 0, -3, 0, -5, 0, -2, 0,
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

                  {/* Text overlay */}
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
