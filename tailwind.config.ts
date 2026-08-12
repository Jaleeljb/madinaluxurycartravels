import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1152px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        navy: {
          950: "#080D16",
          900: "#0B1220",
          800: "#111A2C",
          700: "#182238",
          600: "#233152",
          500: "#33456E",
        },
        gold: {
          200: "#F1DFA8",
          300: "#E8C165",
          400: "#D9AE4E",
          500: "#C6972F",
          600: "#A87A20",
          700: "#8A621A",
        },
        paper: "#FAF8F3",
        ink: {
          DEFAULT: "#14181F",
          soft: "#4B5262",
          muted: "#767F91",
        },
        line: "#E7E2D6",
        success: "#2E7D4F",
        danger: "#B3413A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,0.04), 0 12px 32px -12px rgba(11,18,32,0.18)",
        cardHover: "0 1px 2px rgba(11,18,32,0.06), 0 20px 44px -14px rgba(11,18,32,0.26)",
        gold: "0 10px 30px -10px rgba(198,151,47,0.45)",
      },
      backgroundImage: {
        "route-dashed":
          "repeating-linear-gradient(90deg, currentColor 0, currentColor 8px, transparent 8px, transparent 18px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "route-draw": {
          "0%": { strokeDashoffset: "600" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "route-draw": "route-draw 1.8s ease-out forwards",
        marquee: "marquee 28s linear infinite",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
