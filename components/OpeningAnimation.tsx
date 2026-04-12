"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Lowrider SVG (rear view) ─── */
function LowriderRear() {
  return (
    <svg
      width="220"
      height="160"
      viewBox="0 0 220 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_30px_rgba(255,107,26,0.5)]"
    >
      {/* Car body - rear view */}
      <path
        d="M40 95 L40 60 L50 45 L70 35 L150 35 L170 45 L180 60 L180 95"
        stroke="#FF6B1A"
        strokeWidth="2.5"
        fill="#FF6B1A"
        fillOpacity="0.12"
      />
      {/* Roof */}
      <path
        d="M70 35 L75 18 L145 18 L150 35"
        stroke="#FF6B1A"
        strokeWidth="2"
        fill="#FF6B1A"
        fillOpacity="0.08"
      />
      {/* Rear window */}
      <path
        d="M78 33 L82 22 L138 22 L142 33"
        stroke="#FFB347"
        strokeWidth="1.5"
        fill="#FFB347"
        fillOpacity="0.12"
      />
      {/* Window reflection */}
      <line x1="95" y1="23" x2="90" y2="32" stroke="#FFB347" strokeWidth="0.5" opacity="0.4" />
      <line x1="115" y1="23" x2="110" y2="32" stroke="#FFB347" strokeWidth="0.5" opacity="0.4" />
      {/* Trunk line */}
      <line x1="60" y1="50" x2="160" y2="50" stroke="#FFB347" strokeWidth="0.8" opacity="0.3" />
      {/* Bumper */}
      <rect x="38" y="92" width="144" height="12" rx="3" stroke="#FF6B1A" strokeWidth="2" fill="#FF6B1A" fillOpacity="0.1" />
      {/* Chrome bumper trim */}
      <rect x="50" y="96" width="120" height="4" rx="2" fill="#FFB347" fillOpacity="0.15" />
      <line x1="50" y1="98" x2="170" y2="98" stroke="#FFB347" strokeWidth="0.8" opacity="0.4" />
      {/* Left taillight */}
      <rect x="42" y="70" width="14" height="20" rx="3" fill="#FF3333" fillOpacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="44" y="72" width="10" height="7" rx="2" fill="#FF6644" fillOpacity="0.6" />
      <rect x="44" y="82" width="10" height="6" rx="2" fill="#FF3333" fillOpacity="0.4" />
      {/* Right taillight */}
      <rect x="164" y="70" width="14" height="20" rx="3" fill="#FF3333" fillOpacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="166" y="72" width="10" height="7" rx="2" fill="#FF6644" fillOpacity="0.6" />
      <rect x="166" y="82" width="10" height="6" rx="2" fill="#FF3333" fillOpacity="0.4" />
      {/* License plate area */}
      <rect x="85" y="78" width="50" height="16" rx="2" stroke="#FFB347" strokeWidth="1" fill="#1A0F08" fillOpacity="0.6" />
      <text x="110" y="90" textAnchor="middle" fill="#FFB347" fontSize="7" fontFamily="monospace" opacity="0.7">HOMIES</text>
      {/* Exhaust pipes */}
      <ellipse cx="58" cy="105" rx="5" ry="3" stroke="#FFB347" strokeWidth="1.2" fill="#1A0F08" />
      <ellipse cx="162" cy="105" rx="5" ry="3" stroke="#FFB347" strokeWidth="1.2" fill="#1A0F08" />
      {/* Undercarriage */}
      <line x1="38" y1="105" x2="182" y2="105" stroke="#FF6B1A" strokeWidth="1.5" opacity="0.5" />
      {/* Hydraulic arms */}
      <line x1="55" y1="105" x2="55" y2="120" stroke="#FFB347" strokeWidth="2.5" />
      <line x1="165" y1="105" x2="165" y2="120" stroke="#FFB347" strokeWidth="2.5" />
      {/* Left rear wheel */}
      <ellipse cx="55" cy="128" rx="20" ry="16" stroke="#FF6B1A" strokeWidth="2.5" fill="#1A0F08" />
      <ellipse cx="55" cy="128" rx="10" ry="8" stroke="#FFB347" strokeWidth="1.2" fill="none" />
      <ellipse cx="55" cy="128" rx="3" ry="2.5" fill="#FF6B1A" />
      {/* Right rear wheel */}
      <ellipse cx="165" cy="128" rx="20" ry="16" stroke="#FF6B1A" strokeWidth="2.5" fill="#1A0F08" />
      <ellipse cx="165" cy="128" rx="10" ry="8" stroke="#FFB347" strokeWidth="1.2" fill="none" />
      <ellipse cx="165" cy="128" rx="3" ry="2.5" fill="#FF6B1A" />
      {/* Chrome side trim */}
      <line x1="40" y1="65" x2="40" y2="90" stroke="#FFB347" strokeWidth="0.8" opacity="0.3" />
      <line x1="180" y1="65" x2="180" y2="90" stroke="#FFB347" strokeWidth="0.8" opacity="0.3" />
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
