"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Lowrider SVG (side view silhouette) ─── */
function LowriderCar({ bounce }: { bounce: boolean }) {
  return (
    <motion.div
      animate={
        bounce
          ? {
              y: [0, -30, 0, -15, 0, -25, 0, -10, 0],
              rotate: [0, -3, 0, 2, 0, -2, 0, 1, 0],
            }
          : { y: 0 }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <svg
        width="180"
        height="72"
        viewBox="0 0 180 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_20px_rgba(255,107,26,0.4)]"
      >
        {/* Car body - lowrider profile */}
        <path
          d="M20 45 L30 45 L35 28 L55 20 L75 18 L105 18 L125 20 L140 28 L155 35 L160 45 L165 45"
          stroke="#FF6B1A"
          strokeWidth="2.5"
          fill="#FF6B1A"
          fillOpacity="0.15"
        />
        {/* Roof */}
        <path
          d="M55 20 L60 10 L100 8 L110 12 L125 20"
          stroke="#FF6B1A"
          strokeWidth="2"
          fill="#FF6B1A"
          fillOpacity="0.1"
        />
        {/* Windows */}
        <path
          d="M62 18 L65 11 L82 9.5 L82 18"
          stroke="#FFB347"
          strokeWidth="1.2"
          fill="#FFB347"
          fillOpacity="0.15"
        />
        <path
          d="M86 18 L86 10 L103 9 L108 13 L118 19"
          stroke="#FFB347"
          strokeWidth="1.2"
          fill="#FFB347"
          fillOpacity="0.15"
        />
        {/* Undercarriage */}
        <line
          x1="25"
          y1="46"
          x2="160"
          y2="46"
          stroke="#FF6B1A"
          strokeWidth="2"
        />
        {/* Hydraulic arms */}
        <line
          x1="42"
          y1="46"
          x2="42"
          y2="56"
          stroke="#FFB347"
          strokeWidth="2"
        />
        <line
          x1="140"
          y1="46"
          x2="140"
          y2="56"
          stroke="#FFB347"
          strokeWidth="2"
        />
        {/* Front wheel */}
        <circle
          cx="42"
          cy="58"
          r="12"
          stroke="#FF6B1A"
          strokeWidth="2.5"
          fill="#1A0F08"
        />
        <circle
          cx="42"
          cy="58"
          r="5"
          stroke="#FFB347"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="42" cy="58" r="2" fill="#FF6B1A" />
        {/* Rear wheel */}
        <circle
          cx="140"
          cy="58"
          r="12"
          stroke="#FF6B1A"
          strokeWidth="2.5"
          fill="#1A0F08"
        />
        <circle
          cx="140"
          cy="58"
          r="5"
          stroke="#FFB347"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="140" cy="58" r="2" fill="#FF6B1A" />
        {/* Headlight */}
        <ellipse
          cx="162"
          cy="42"
          rx="3"
          ry="2.5"
          fill="#FFB347"
          opacity="0.8"
        />
        {/* Taillight */}
        <rect
          x="18"
          y="40"
          width="4"
          height="5"
          rx="1"
          fill="#FF6B1A"
          opacity="0.9"
        />
        {/* Chrome trim line */}
        <line
          x1="30"
          y1="35"
          x2="155"
          y2="35"
          stroke="#FFB347"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </svg>

      {/* Ground shadow */}
      <motion.div
        animate={
          bounce
            ? { scaleX: [1, 0.7, 1, 0.85, 1, 0.75, 1, 0.9, 1] }
            : { scaleX: 1 }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-2 bg-sunset/20 rounded-full blur-sm"
      />
    </motion.div>
  );
}

/* ─── Spark particles ─── */
function Sparks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-sunset"
          initial={{
            x: 80 + Math.random() * 20,
            y: 60,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: 80 + Math.random() * 20 + (Math.random() - 0.5) * 40,
            y: 60 - Math.random() * 30,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.3 + Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Hospital cross icon ─── */
function ClinicCross() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="20" rx="1" fill="#FF6B1A" />
      <rect x="2" y="9" width="20" height="6" rx="1" fill="#FF6B1A" />
    </svg>
  );
}

/* ─── Main Opening Animation ─── */
export default function OpeningAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"loading" | "opening" | "done">(
    "loading",
  );

  useEffect(() => {
    // Loading phase: lowrider hops
    const openTimer = setTimeout(() => setPhase("opening"), 3000);
    // Door open complete
    const doneTimer = setTimeout(() => setPhase("done"), 4200);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {/* Main content - always in DOM for SEO */}
      <div
        className={phase === "done" ? "" : "overflow-hidden max-h-screen"}
      >
        {children}
      </div>

      {/* Loading + Door overlay */}
      <AnimatePresence>
        {phase !== "done" && (
          <>
            {/* ─── Loading Screen ─── */}
            <AnimatePresence>
              {phase === "loading" && (
                <motion.div
                  key="loader"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 z-[100] bg-midnight flex flex-col items-center justify-center"
                >
                  {/* Grain overlay */}
                  <div className="absolute inset-0 grain pointer-events-none" />

                  {/* Subtle background glow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sunset/10 rounded-full blur-3xl" />

                  {/* Content */}
                  <div className="relative flex flex-col items-center">
                    {/* Lowrider hopping */}
                    <div className="relative mb-12">
                      <LowriderCar bounce={true} />
                      <Sparks />
                    </div>

                    {/* "Coming in..." text */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="font-script text-sunset text-2xl md:text-3xl mb-3 tracking-wider">
                        Car Wash Homies
                      </div>
                      <div className="text-chrome/50 text-xs tracking-[0.3em] uppercase">
                        車の美容外科
                      </div>
                    </motion.div>

                    {/* Loading bar */}
                    <div className="mt-8 w-48 h-[2px] bg-midnight-50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-sunset-gradient rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.8, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Hospital Doors ─── */}
            {phase === "opening" && (
              <>
                {/* Left door */}
                <motion.div
                  key="door-left"
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  className="fixed top-0 left-0 w-1/2 h-full z-[99] bg-cream"
                >
                  {/* Door panel styling */}
                  <div className="absolute inset-0 bg-cream border-r-2 border-sunset/20">
                    {/* Door frame */}
                    <div className="absolute inset-4 border border-midnight/10 rounded-lg" />
                    {/* Window panel */}
                    <div className="absolute top-1/4 left-1/4 right-8 bottom-1/3 bg-sunset/5 border border-midnight/10 rounded-md" />
                    {/* Door label */}
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col items-end gap-4">
                      <ClinicCross />
                      <div className="text-midnight/40 text-xs tracking-[0.3em] [writing-mode:vertical-rl]">
                        車の美容外科
                      </div>
                    </div>
                    {/* Handle */}
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 w-1 h-16 bg-sunset/40 rounded-full" />
                  </div>
                </motion.div>

                {/* Right door */}
                <motion.div
                  key="door-right"
                  initial={{ x: "0%" }}
                  animate={{ x: "100%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  className="fixed top-0 right-0 w-1/2 h-full z-[99] bg-cream"
                >
                  {/* Door panel styling */}
                  <div className="absolute inset-0 bg-cream border-l-2 border-sunset/20">
                    <div className="absolute inset-4 border border-midnight/10 rounded-lg" />
                    <div className="absolute top-1/4 right-1/4 left-8 bottom-1/3 bg-sunset/5 border border-midnight/10 rounded-md" />
                    <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-start gap-4">
                      <ClinicCross />
                      <div className="text-midnight/40 text-xs tracking-[0.3em] [writing-mode:vertical-rl]">
                        Car Wash Homies
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 w-1 h-16 bg-sunset/40 rounded-full" />
                  </div>
                </motion.div>

                {/* Center "opening" light burst */}
                <motion.div
                  key="burst"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
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
