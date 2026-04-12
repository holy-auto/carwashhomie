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
      <line x1="55" y1="112" x2="55" y2="130" stroke="#FFB347" strokeWidth="2" opacity="0.7" />
      <line x1="205" y1="112" x2="205" y2="130" stroke="#FFB347" strokeWidth="2" opacity="0.7" />
      {/* Springs */}
      <path d="M52 115 L58 118 L52 121 L58 124 L52 127" stroke="#FFB347" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M202 115 L208 118 L202 121 L208 124 L202 127" stroke="#FFB347" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* ── LEFT wire wheel + whitewall ── */}
      <g>
        {/* Tire (black) */}
        <ellipse cx="55" cy="148" rx="26" ry="22" fill="#111111" />
        {/* Whitewall */}
        <ellipse cx="55" cy="148" rx="26" ry="22" stroke="#EEEEEE" strokeWidth="4" fill="none" opacity="0.7" />
        {/* Inner tire */}
        <ellipse cx="55" cy="148" rx="20" ry="16" fill="#1A1A1A" />
        {/* Wire spoke hub */}
        <ellipse cx="55" cy="148" rx="14" ry="11" fill="#2A2A2A" stroke="#FFB347" strokeWidth="0.8" opacity="0.6" />
        {/* Wire spokes */}
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <line
            key={angle}
            x1={55 + Math.cos((angle * Math.PI) / 180) * 3}
            y1={148 + Math.sin((angle * Math.PI) / 180) * 2.5}
            x2={55 + Math.cos((angle * Math.PI) / 180) * 13}
            y2={148 + Math.sin((angle * Math.PI) / 180) * 10}
            stroke="#FFB347"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        {/* Chrome center cap (knock-off) */}
        <ellipse cx="55" cy="148" rx="5" ry="4" fill="#FFB347" fillOpacity="0.25" stroke="#FFB347" strokeWidth="1" opacity="0.7" />
        {/* Knock-off spinner */}
        <ellipse cx="55" cy="148" rx="2" ry="1.5" fill="#FFB347" fillOpacity="0.5" />
      </g>

      {/* ── RIGHT wire wheel + whitewall ── */}
      <g>
        <ellipse cx="205" cy="148" rx="26" ry="22" fill="#111111" />
        <ellipse cx="205" cy="148" rx="26" ry="22" stroke="#EEEEEE" strokeWidth="4" fill="none" opacity="0.7" />
        <ellipse cx="205" cy="148" rx="20" ry="16" fill="#1A1A1A" />
        <ellipse cx="205" cy="148" rx="14" ry="11" fill="#2A2A2A" stroke="#FFB347" strokeWidth="0.8" opacity="0.6" />
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <line
            key={angle}
            x1={205 + Math.cos((angle * Math.PI) / 180) * 3}
            y1={148 + Math.sin((angle * Math.PI) / 180) * 2.5}
            x2={205 + Math.cos((angle * Math.PI) / 180) * 13}
            y2={148 + Math.sin((angle * Math.PI) / 180) * 10}
            stroke="#FFB347"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        <ellipse cx="205" cy="148" rx="5" ry="4" fill="#FFB347" fillOpacity="0.25" stroke="#FFB347" strokeWidth="1" opacity="0.7" />
        <ellipse cx="205" cy="148" rx="2" ry="1.5" fill="#FFB347" fillOpacity="0.5" />
      </g>

      {/* ── "IMPALA" emblem (chrome text on trunk) ── */}
      <text x="130" y="62" textAnchor="middle" fill="#FFB347" fontSize="5" fontFamily="serif" letterSpacing="3" opacity="0.4">IMPALA</text>

      {/* ── Chevy bowtie emblem (center trunk) ── */}
      <path d="M126 55 L130 53 L134 55 L130 57 Z" fill="#FFB347" fillOpacity="0.35" />
    </svg>
  );
}

/* ─── Clinic building (in the distance) ─── */
function ClinicBuilding() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Building */}
      <div className="relative w-48 md:w-64 bg-cream/90 border-2 border-midnight/15 rounded-t-lg px-4 pt-3 pb-0">
        {/* Roof / Sign */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-sunset px-6 py-1.5 rounded-t-lg">
          <div className="text-midnight text-[8px] md:text-[10px] font-bold tracking-wider text-center">
            車の美容外科
          </div>
        </div>
        {/* Cross */}
        <div className="flex justify-center mb-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="20" rx="1" fill="#FF6B1A" />
            <rect x="2" y="9" width="20" height="6" rx="1" fill="#FF6B1A" />
          </svg>
        </div>
        {/* Windows row */}
        <div className="flex gap-2 justify-center mb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-8 bg-sunset/10 border border-midnight/10 rounded-sm" />
          ))}
        </div>
        {/* Door - this is where the car is heading */}
        <div className="flex justify-center">
          <div className="relative w-16 h-12 border-2 border-sunset/40 rounded-t-md bg-sunset/5 overflow-hidden">
            {/* Door split line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-sunset/40" />
            {/* Glow from inside */}
            <div className="absolute inset-0 bg-gradient-to-t from-sunset/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
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

/* ─── Main Opening Animation ─── */
export default function OpeningAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"driving" | "arriving" | "doors" | "done">("driving");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("arriving"), 3200);
    const t2 = setTimeout(() => setPhase("doors"), 5000);
    const t3 = setTimeout(() => setPhase("done"), 6400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      <div className={phase === "done" ? "" : "overflow-hidden max-h-screen"}>
        {children}
      </div>

      <AnimatePresence>
        {phase !== "done" && (
          <>
            {/* ─── Driving / Arriving Scene ─── */}
            <AnimatePresence>
              {(phase === "driving" || phase === "arriving") && (
                <motion.div
                  key="scene"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 z-[100] bg-midnight overflow-hidden"
                >
                  <div className="absolute inset-0 grain pointer-events-none" />

                  {/* Night sky gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0604] via-midnight to-[#2a1f16]" />

                  {/* Stars */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-cream/40 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 40}%`,
                      }}
                    />
                  ))}

                  {/* Moon */}
                  <div className="absolute top-[8%] right-[15%] w-8 h-8 rounded-full bg-cream/20 blur-[1px] shadow-[0_0_20px_rgba(255,248,240,0.1)]" />

                  {/* Clinic building in the distance - gets closer */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2"
                    initial={{ top: "30%", scale: 0.5, opacity: 0.4 }}
                    animate={
                      phase === "arriving"
                        ? { top: "18%", scale: 1.1, opacity: 1 }
                        : { top: "30%", scale: 0.5, opacity: 0.4 }
                    }
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    <ClinicBuilding />
                  </motion.div>

                  {/* Road */}
                  <Road />

                  {/* Exhaust smoke */}
                  <ExhaustSmoke />

                  {/* Lowrider from behind - hopping down the road */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[22%]"
                    animate={
                      phase === "arriving"
                        ? { scale: [1, 0.6], y: [0, -60] }
                        : undefined
                    }
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -25, 0, -12, 0, -20, 0, -8, 0],
                        rotateX: [0, 3, 0, -2, 0, 2, 0, -1, 0],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <LowriderRear />
                    </motion.div>

                    {/* Ground shadow under car */}
                    <motion.div
                      animate={{
                        scaleX: [1, 0.7, 1, 0.85, 1, 0.75, 1, 0.9, 1],
                        opacity: [0.3, 0.15, 0.3, 0.2, 0.3, 0.15, 0.3, 0.2, 0.3],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
                        transition={{ duration: 4.8, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-center mt-2 text-chrome/40 text-[10px] tracking-[0.3em] uppercase"
                    >
                      Entering the Clinic...
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Hospital Doors ─── */}
            {phase === "doors" && (
              <>
                {/* Left door */}
                <motion.div
                  key="door-left"
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  className="fixed top-0 left-0 w-1/2 h-full z-[99] bg-cream"
                >
                  <div className="absolute inset-0 bg-cream border-r-2 border-sunset/20">
                    <div className="absolute inset-4 border border-midnight/10 rounded-lg" />
                    <div className="absolute top-1/4 left-1/4 right-8 bottom-1/3 bg-sunset/5 border border-midnight/10 rounded-md" />
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col items-end gap-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="2" width="6" height="20" rx="1" fill="#FF6B1A" />
                        <rect x="2" y="9" width="20" height="6" rx="1" fill="#FF6B1A" />
                      </svg>
                      <div className="text-midnight/40 text-xs tracking-[0.3em] [writing-mode:vertical-rl]">
                        車の美容外科
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 w-1 h-16 bg-sunset/40 rounded-full" />
                  </div>
                </motion.div>

                {/* Right door */}
                <motion.div
                  key="door-right"
                  initial={{ x: "0%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  className="fixed top-0 right-0 w-1/2 h-full z-[99] bg-cream"
                >
                  <div className="absolute inset-0 bg-cream border-l-2 border-sunset/20">
                    <div className="absolute inset-4 border border-midnight/10 rounded-lg" />
                    <div className="absolute top-1/4 right-1/4 left-8 bottom-1/3 bg-sunset/5 border border-midnight/10 rounded-md" />
                    <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-start gap-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="2" width="6" height="20" rx="1" fill="#FF6B1A" />
                        <rect x="2" y="9" width="20" height="6" rx="1" fill="#FF6B1A" />
                      </svg>
                      <div className="text-midnight/40 text-xs tracking-[0.3em] [writing-mode:vertical-rl]">
                        Car Wash Homies
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 w-1 h-16 bg-sunset/40 rounded-full" />
                  </div>
                </motion.div>

                {/* Light burst */}
                <motion.div
                  key="burst"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="fixed inset-0 z-[98] bg-sunset/10 pointer-events-none"
                />
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
