import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          DEFAULT: "#FF6B1A",
          50: "#FFF1E6",
          100: "#FFE0C2",
          200: "#FFC285",
          300: "#FFA347",
          400: "#FF8533",
          500: "#FF6B1A",
          600: "#E55300",
          700: "#B84200",
          800: "#8A3100",
          900: "#5C2100",
        },
        cream: "#FFF8F0",
        midnight: {
          DEFAULT: "#1A0F08",
          50: "#3D2819",
          100: "#2E1D11",
          200: "#1A0F08",
          300: "#120A05",
        },
        chrome: "#E8E8EC",
        ivory: "#FFF8F0",
        // 90s neon accents — used sparingly for retro pop
        magenta: {
          DEFAULT: "#FF2E97",
          400: "#FF5BAE",
          500: "#FF2E97",
          600: "#D81F7E",
        },
        cyan90: {
          DEFAULT: "#00E5FF",
          400: "#5CF0FF",
          500: "#00E5FF",
          600: "#00B8CC",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-blackletter)", "UnifrakturMaguntia", "serif"],
        body: ["var(--font-noto)", "system-ui", "sans-serif"],
        // 90s / Y2K
        pixel: ["var(--font-pixel)", "monospace"],
        crt: ["var(--font-crt)", "monospace"],
        chunky: ["var(--font-chunky)", "Impact", "sans-serif"],
        pixelJp: [
          "var(--font-pixel-jp)",
          "var(--font-pixel)",
          "monospace",
        ],
      },
      backgroundImage: {
        "sunset-gradient":
          "linear-gradient(135deg, #FF6B1A 0%, #FFB347 100%)",
        "garage-gradient":
          "linear-gradient(180deg, #1A0F08 0%, #3D2819 50%, #FF6B1A 100%)",
        "candy-paint":
          "radial-gradient(ellipse at top, #FF8533 0%, #FF6B1A 40%, #8A3100 100%)",
        // 90s — Y2K candy gradient: orange → magenta → cyan
        "candy-90s":
          "linear-gradient(135deg, #FF6B1A 0%, #FF2E97 50%, #00E5FF 100%)",
        "vhs-bg":
          "linear-gradient(180deg, #1A0F08 0%, #2E1D11 50%, #1A0F08 100%)",
      },
      boxShadow: {
        chrome: "0 0 20px rgba(255, 107, 26, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        "sunset-glow": "0 0 40px rgba(255, 107, 26, 0.5)",
        clinic: "0 4px 24px rgba(26, 15, 8, 0.08)",
        // 90s chunky stacked drop-shadow (Memphis / poster style)
        "retro-pop": "4px 4px 0 0 #1A0F08",
        "retro-pop-lg": "6px 6px 0 0 #1A0F08",
        "retro-pop-sunset": "4px 4px 0 0 #FF6B1A",
        "retro-pop-magenta": "4px 4px 0 0 #FF2E97",
        // 90s chrome bevel (light top, dark bottom)
        "chrome-bevel":
          "inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.25), 0 6px 12px rgba(0,0,0,0.18)",
        // Neon glow (Y2K)
        "neon-magenta": "0 0 12px rgba(255,46,151,0.8), 0 0 28px rgba(255,46,151,0.45)",
        "neon-cyan": "0 0 12px rgba(0,229,255,0.8), 0 0 28px rgba(0,229,255,0.45)",
      },
      animation: {
        "hydraulic-bounce": "hydraulic 2.5s ease-in-out infinite",
        "chrome-shine": "chromeShine 3s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slide-in": "slideIn 1s ease-out forwards",
      },
      keyframes: {
        hydraulic: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-8px) rotate(-1deg)" },
          "50%": { transform: "translateY(0) rotate(0deg)" },
          "75%": { transform: "translateY(-4px) rotate(1deg)" },
        },
        chromeShine: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
