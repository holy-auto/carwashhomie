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
    "building" | "doors-closed" | "doors-open" | "done"
  >("building");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("doors-closed"), 3400);
    const t2 = setTimeout(() => setPhase("doors-open"), 5000);
    const t3 = setTimeout(() => setPhase("done"), 6100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      <div className={phase === "done" ? "" : "overflow-hidden max-h-screen"}>
        {children}
      </div>

      <AnimatePresence>
        {phase !== "done" && (
          <>
            <AnimatePresence>
              {phase === "building" && (
                <motion.div
                  key="scene"
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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

                  {/* Logo build-up */}
                  <motion.div
                    initial={{
                      scale: 0.3,
                      opacity: 0,
                      filter: "blur(30px) brightness(3)",
                    }}
                    animate={{
                      scale: [0.3, 1.08, 1],
                      opacity: [0, 1, 1],
                      filter: [
                        "blur(30px) brightness(3)",
                        "blur(0px) brightness(1.2)",
                        "blur(0px) brightness(1)",
                      ],
                    }}
                    transition={{
                      duration: 2.2,
                      delay: 0.9,
                      times: [0, 0.75, 1],
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="relative"
                  >
                    <Image
                      src="/logo.png"
                      alt="Car Wash Homies"
                      width={400}
                      height={400}
                      priority
                      className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_60px_rgba(255,107,26,0.55)]"
                    />

                    {/* Chrome shine sweep across logo */}
                    <motion.div
                      initial={{ x: "-120%", opacity: 0 }}
                      animate={{ x: "120%", opacity: [0, 0.6, 0] }}
                      transition={{
                        duration: 1.2,
                        delay: 2.2,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
                        mixBlendMode: "screen",
                      }}
                    />
                  </motion.div>

                  {/* Completion flash */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{
                      duration: 0.7,
                      delay: 2.7,
                      times: [0, 0.25, 1],
                    }}
                    className="absolute inset-0 bg-sunset/80 pointer-events-none"
                  />

                  {/* Top clinic label */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute top-[12%] left-0 right-0 text-center px-6"
                  >
                    <div className="inline-flex items-center gap-3 text-chrome/50 text-[10px] tracking-[0.4em] uppercase">
                      <span className="h-[1px] w-8 bg-chrome/25" />
                      Automotive Aesthetic Clinic
                      <span className="h-[1px] w-8 bg-chrome/25" />
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
                            duration: 3.2,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-3 text-chrome/40 text-[10px] tracking-[0.3em] uppercase"
                      >
                        Preparing Your Clinic...
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
