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
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-monoton)", "Impact", "sans-serif"],
        body: ["var(--font-noto)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "sunset-gradient":
          "linear-gradient(135deg, #FF6B1A 0%, #FFB347 100%)",
        "garage-gradient":
          "linear-gradient(180deg, #1A0F08 0%, #3D2819 50%, #FF6B1A 100%)",
        "candy-paint":
          "radial-gradient(ellipse at top, #FF8533 0%, #FF6B1A 40%, #8A3100 100%)",
      },
      boxShadow: {
        chrome: "0 0 20px rgba(255, 107, 26, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
        "sunset-glow": "0 0 40px rgba(255, 107, 26, 0.5)",
        clinic: "0 4px 24px rgba(26, 15, 8, 0.08)",
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
