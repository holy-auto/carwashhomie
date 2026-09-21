"use client";

/* Procedural "illustration" fill for cards without an uploaded image.
   Layers a light source, soft shadow, cross-hatching, film grain and a
   vignette over the accent colour so the placeholder reads like printed
   art rather than a flat digital gradient. */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Illustration({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base colour */}
      <div className="absolute inset-0" style={{ background: accent }} />
      {/* light source (top-left) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.42), rgba(255,255,255,0) 55%)",
        }}
      />
      {/* soft shadow (bottom-right) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 74% 90%, rgba(0,0,0,0.5), rgba(0,0,0,0) 62%)",
        }}
      />
      {/* form tint for depth */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.28), rgba(0,0,0,0.3))",
        }}
      />
      {/* cross-hatching */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 4px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 5px)",
        }}
      />
      {/* film grain */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.22]"
        style={{ backgroundImage: NOISE, backgroundSize: "140px 140px" }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 26px rgba(0,0,0,0.55)" }}
      />
    </div>
  );
}
