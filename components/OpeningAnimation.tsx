"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Lowrider SVG (rear view) ─── */
function LowriderRear() {
  return (
    <svg
      width="260"
      height="200"
      viewBox="0 0 260 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_40px_rgba(255,107,26,0.4)]"
    >
      {/* === '64 IMPALA REAR VIEW === */}

      {/* ── Vinyl top (black) ── */}
      <path
        d="M72 38 L78 14 L182 14 L188 38"
        stroke="#FFB347"
        strokeWidth="1"
        fill="#1A0F08"
        fillOpacity="0.7"
      />
      {/* Chrome trim around vinyl top */}
      <path d="M72 38 L78 14 L182 14 L188 38" stroke="#FFB347" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* ── Rear window ── */}
      <path
        d="M80 36 L84 18 L176 18 L180 36"
        stroke="#88BBCC"
        strokeWidth="1.5"
        fill="#88BBCC"
        fillOpacity="0.15"
      />
      {/* Window reflections */}
      <line x1="110" y1="19" x2="105" y2="35" stroke="#88BBCC" strokeWidth="0.6" opacity="0.3" />
      <line x1="140" y1="19" x2="135" y2="35" stroke="#88BBCC" strokeWidth="0.6" opacity="0.3" />
      <line x1="155" y1="19" x2="152" y2="35" stroke="#88BBCC" strokeWidth="0.6" opacity="0.2" />

      {/* ── Main body (red, wide Impala shape) ── */}
      <path
        d="M35 100 L35 65 L42 48 L65 38 L195 38 L218 48 L225 65 L225 100"
        stroke="#CC2222"
        strokeWidth="2"
        fill="#CC2222"
        fillOpacity="0.25"
      />
      {/* Body fill panels */}
      <path
        d="M42 48 L65 38 L195 38 L218 48 L225 65 L225 95 L35 95 L35 65 Z"
        fill="#CC2222"
        fillOpacity="0.12"
      />

      {/* ── Chrome side trim (horizontal line like Impala) ── */}
      <line x1="36" y1="68" x2="224" y2="68" stroke="#FFB347" strokeWidth="1.2" opacity="0.6" />
      <line x1="36" y1="70" x2="224" y2="70" stroke="#FFB347" strokeWidth="0.5" opacity="0.3" />

      {/* ── Trunk lid lines ── */}
      <line x1="80" y1="45" x2="180" y2="45" stroke="#CC2222" strokeWidth="0.6" opacity="0.4" />
      {/* Trunk keyhole */}
      <circle cx="130" cy="52" r="1.5" fill="#FFB347" opacity="0.5" />

      {/* ── Triple taillights LEFT ('64 Impala signature) ── */}
      <g>
        <rect x="36" y="74" width="10" height="7" rx="2" fill="#FF2222" fillOpacity="0.95">
          <animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="36" y="83" width="10" height="7" rx="2" fill="#FF2222" fillOpacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
        </rect>
        <rect x="36" y="92" width="10" height="5" rx="1.5" fill="#FF4444" fillOpacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        {/* Chrome bezels */}
        <rect x="35" y="73" width="12" height="9" rx="2.5" stroke="#FFB347" strokeWidth="0.7" fill="none" opacity="0.5" />
        <rect x="35" y="82" width="12" height="9" rx="2.5" stroke="#FFB347" strokeWidth="0.7" fill="none" opacity="0.5" />
        <rect x="35" y="91" width="12" height="7" rx="2" stroke="#FFB347" strokeWidth="0.7" fill="none" opacity="0.4" />
      </g>

      {/* ── Triple taillights RIGHT ── */}
      <g>
        <rect x="214" y="74" width="10" height="7" rx="2" fill="#FF2222" fillOpacity="0.95">
          <animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="214" y="83" width="10" height="7" rx="2" fill="#FF2222" fillOpacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.8s" begin="0.15s" repeatCount="indefinite" />
        </rect>
        <rect x="214" y="92" width="10" height="5" rx="1.5" fill="#FF4444" fillOpacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="213" y="73" width="12" height="9" rx="2.5" stroke="#FFB347" strokeWidth="0.7" fill="none" opacity="0.5" />
        <rect x="213" y="82" width="12" height="9" rx="2.5" stroke="#FFB347" strokeWidth="0.7" fill="none" opacity="0.5" />
        <rect x="213" y="91" width="12" height="7" rx="2" stroke="#FFB347" strokeWidth="0.7" fill="none" opacity="0.4" />
      </g>

      {/* ── Taillight glow (ambient light) ── */}
      <ellipse cx="41" cy="85" rx="18" ry="12" fill="#FF2222" fillOpacity="0.08">
        <animate attributeName="fillOpacity" values="0.08;0.03;0.08" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="219" cy="85" rx="18" ry="12" fill="#FF2222" fillOpacity="0.08">
        <animate attributeName="fillOpacity" values="0.08;0.03;0.08" dur="0.8s" repeatCount="indefinite" />
      </ellipse>

      {/* ── Chrome bumper ── */}
      <rect x="30" y="100" width="200" height="10" rx="3" fill="#FFB347" fillOpacity="0.12" stroke="#FFB347" strokeWidth="1.2" opacity="0.7" />
      {/* Bumper chrome highlight */}
      <line x1="40" y1="103" x2="220" y2="103" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="107" x2="220" y2="107" stroke="#FFB347" strokeWidth="0.5" opacity="0.3" />

      {/* ── License plate ── */}
      <rect x="100" y="83" width="60" height="18" rx="2" fill="#EEEEEE" fillOpacity="0.85" stroke="#FFB347" strokeWidth="0.8" />
      <text x="130" y="95" textAnchor="middle" fill="#1A0F08" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.8">HOMIES</text>
      {/* Plate frame chrome */}
      <rect x="99" y="82" width="62" height="20" rx="2.5" stroke="#FFB347" strokeWidth="0.6" fill="none" opacity="0.4" />

      {/* ── Exhaust pipe (single, offset left like Impala) ── */}
      <ellipse cx="75" cy="112" rx="6" ry="3.5" stroke="#FFB347" strokeWidth="1" fill="#1A0F08" fillOpacity="0.8" />
      <ellipse cx="75" cy="112" rx="3.5" ry="2" fill="#1A0F08" />

      {/* ── Undercarriage ── */}
      <line x1="30" y1="112" x2="230" y2="112" stroke="#CC2222" strokeWidth="1" opacity="0.3" />

      {/* ── Hydraulic suspension arms ── */}
      <line x1="55" y1="112" x2="55" y2="120" stroke="#FFB347" strokeWidth="2" opacity="0.7" />
      <line x1="205" y1="112" x2="205" y2="120" stroke="#FFB347" strokeWidth="2" opacity="0.7" />
      {/* Springs */}
      <path d="M52 113 L58 115 L52 117 L58 119" stroke="#FFB347" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M202 113 L208 115 L202 117 L208 119" stroke="#FFB347" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* ── LEFT wire wheel + whitewall ── */}
      <g>
        {/* Tire (black) */}
        <circle cx="55" cy="130" r="18" fill="#111111" />
        {/* Whitewall */}
        <circle cx="55" cy="130" r="18" stroke="#EEEEEE" strokeWidth="3" fill="none" opacity="0.7" />
        {/* Inner tire */}
        <circle cx="55" cy="130" r="14" fill="#1A1A1A" />
        {/* Wire spoke hub */}
        <circle cx="55" cy="130" r="9" fill="#2A2A2A" stroke="#FFB347" strokeWidth="0.8" opacity="0.6" />
        {/* Wire spokes */}
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <line
            key={angle}
            x1={55 + Math.cos((angle * Math.PI) / 180) * 2.5}
            y1={130 + Math.sin((angle * Math.PI) / 180) * 2.5}
            x2={55 + Math.cos((angle * Math.PI) / 180) * 8.5}
            y2={130 + Math.sin((angle * Math.PI) / 180) * 8.5}
            stroke="#FFB347"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        {/* Chrome center cap (knock-off) */}
        <circle cx="55" cy="130" r="3.5" fill="#FFB347" fillOpacity="0.25" stroke="#FFB347" strokeWidth="1" opacity="0.7" />
        {/* Knock-off spinner */}
        <circle cx="55" cy="130" r="1.5" fill="#FFB347" fillOpacity="0.5" />
      </g>

      {/* ── RIGHT wire wheel + whitewall ── */}
      <g>
        <circle cx="205" cy="130" r="18" fill="#111111" />
        <circle cx="205" cy="130" r="18" stroke="#EEEEEE" strokeWidth="3" fill="none" opacity="0.7" />
        <circle cx="205" cy="130" r="14" fill="#1A1A1A" />
        <circle cx="205" cy="130" r="9" fill="#2A2A2A" stroke="#FFB347" strokeWidth="0.8" opacity="0.6" />
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <line
            key={angle}
            x1={205 + Math.cos((angle * Math.PI) / 180) * 2.5}
            y1={130 + Math.sin((angle * Math.PI) / 180) * 2.5}
            x2={205 + Math.cos((angle * Math.PI) / 180) * 8.5}
            y2={130 + Math.sin((angle * Math.PI) / 180) * 8.5}
            stroke="#FFB347"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        <circle cx="205" cy="130" r="3.5" fill="#FFB347" fillOpacity="0.25" stroke="#FFB347" strokeWidth="1" opacity="0.7" />
        <circle cx="205" cy="130" r="1.5" fill="#FFB347" fillOpacity="0.5" />
      </g>

      {/* ── "IMPALA" emblem (chrome text on trunk) ── */}
      <text x="130" y="62" textAnchor="middle" fill="#FFB347" fontSize="5" fontFamily="serif" letterSpacing="3" opacity="0.4">IMPALA</text>

      {/* ── Chevy bowtie emblem (center trunk) ── */}
      <path d="M126 55 L130 53 L134 55 L130 57 Z" fill="#FFB347" fillOpacity="0.35" />
    </svg>
  );
}

/* ─── Road with perspective ─── */
function Road() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45%] overflow-hidden">
      {/* Road surface */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #2a1f16 0%, #1A0F08 100%)",
        }}
      />
      {/* Center dashed line - perspective */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-3 origin-bottom"
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
      {/* Left road edge */}
      <div
        className="absolute bottom-0 h-full"
        style={{
          left: "15%",
          width: "1px",
          background: "linear-gradient(to top, rgba(255,107,26,0.3), transparent 70%)",
          transform: "perspective(400px) rotateY(-2deg)",
        }}
      />
      {/* Right road edge */}
      <div
        className="absolute bottom-0 h-full"
        style={{
          right: "15%",
          width: "1px",
          background: "linear-gradient(to top, rgba(255,107,26,0.3), transparent 70%)",
          transform: "perspective(400px) rotateY(2deg)",
        }}
      />
    </div>
  );
}

/* ─── Exhaust smoke ─── */
function ExhaustSmoke() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-chrome/10"
          style={{
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            left: `${45 + Math.random() * 10}%`,
            bottom: "28%",
          }}
          animate={{
            y: [0, 30 + Math.random() * 30],
            x: (Math.random() - 0.5) * 40,
            opacity: [0, 0.4, 0],
            scale: [0.5, 2, 3],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

/* ─── Hospital Door Panel ─── */
function DoorPanel({
  side,
}: {
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  return (
    <div className={`absolute inset-0 bg-cream ${isLeft ? "border-r-2" : "border-l-2"} border-sunset/20`}>
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
  // driving → departing → doors-closed → doors-open → done
  const [phase, setPhase] = useState<
    "driving" | "departing" | "doors-closed" | "doors-open" | "done"
  >("driving");

  useEffect(() => {
    // 0~3s:    Car hops on road
    // 3~4.2s:  Car drives away toward clinic
    // 4.2~4.7: Scene fades to doors (closed)
    // 4.7~6.5: Doors sit closed (1.8s pause)
    // 6.5~7.6: Doors slide open
    // 7.6:     Done
    const t1 = setTimeout(() => setPhase("departing"), 3000);
    const t2 = setTimeout(() => setPhase("doors-closed"), 4200);
    const t3 = setTimeout(() => setPhase("doors-open"), 6500);
    const t4 = setTimeout(() => setPhase("done"), 7800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
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
                        left: `${10 + (i * 4.3) % 80}%`,
                        top: `${5 + (i * 7.1) % 35}%`,
                      }}
                    />
                  ))}

                  {/* Moon */}
                  <div className="absolute top-[8%] right-[15%] w-8 h-8 rounded-full bg-cream/20 blur-[1px] shadow-[0_0_20px_rgba(255,248,240,0.1)]" />

                  {/* Road */}
                  <Road />

                  {/* Exhaust smoke */}
                  {phase === "driving" && <ExhaustSmoke />}

                  {/* Lowrider — front-end hop during driving, drives away during departing */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[22%]"
                    animate={
                      phase === "departing"
                        ? {
                            scale: [1, 0.08],
                            y: [0, -200],
                            opacity: [1, 0.8, 0.4, 0],
                          }
                        : undefined
                    }
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Perspective wrapper for 3D tilt */}
                    <div style={{ perspective: 400 }}>
                      <motion.div
                        style={{ transformOrigin: "center bottom" }}
                        animate={
                          phase === "driving"
                            ? {
                                rotateX: [0, 15, 0, 8, 0, 12, 0, 5, 0],
                              }
                            : { rotateX: 0 }
                        }
                        transition={
                          phase === "driving"
                            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
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
                              scaleX: [1, 0.85, 1, 0.9, 1, 0.85, 1, 0.95, 1],
                              opacity: [0.3, 0.2, 0.3, 0.25, 0.3, 0.2, 0.3, 0.25, 0.3],
                            }
                          : { opacity: 0 }
                      }
                      transition={
                        phase === "driving"
                          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.5 }
                      }
                      className="mx-auto mt-1 w-40 h-3 bg-sunset/30 rounded-full blur-md"
                    />
                  </motion.div>

                  {/* Text overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center"
                  >
                    <div className="font-script text-sunset text-xl md:text-2xl tracking-wider drop-shadow-[0_0_20px_rgba(255,107,26,0.4)]">
                      Car Wash Homies
                    </div>
                  </motion.div>

                  {/* Loading bar */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
                    <div className="w-full h-[2px] bg-midnight-50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-sunset-gradient rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1] }}
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Hospital Doors (closed → open) ─── */}
            {(phase === "doors-closed" || phase === "doors-open") && (
              <>
                {/* Left door */}
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

                {/* Right door */}
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

                {/* Center seam line (visible while closed) */}
                {phase === "doors-closed" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="fixed top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-[100] bg-sunset/30"
                  />
                )}

                {/* Light burst when doors open */}
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
