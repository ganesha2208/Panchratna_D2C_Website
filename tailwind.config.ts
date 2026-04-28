import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#f97316",
          dark: "#c2450c",
        },
        "accent-dark": "#c2450c",
        // Primary green (from brand logo leaves)
        brand: {
          50: "#f2faf2",
          100: "#e0f3e0",
          200: "#c0e5c2",
          300: "#90d095",
          400: "#7dc04b",
          500: "#6bb534",
          600: "#55a125",
          700: "#44801e",
          800: "#356519",
          900: "#2a4f15",
          950: "#14300a",
        },
        // Orange accent (from brand logo "O" mark)
        orange: {
          50: "#fff6ed",
          100: "#ffead4",
          200: "#fed2a8",
          300: "#fdb272",
          400: "#fb8a3a",
          500: "#f97316",
          600: "#ea5b0c",
          700: "#c2450c",
          800: "#9a3812",
          900: "#7c3012",
          950: "#431607",
        },
        // Earth tones for backgrounds
        earth: {
          50: "#fbf8f3",
          100: "#f3ebdb",
          200: "#e6d4b5",
          300: "#d5b785",
          400: "#c69c5d",
          500: "#b88449",
          600: "#a26c3d",
          700: "#865434",
          800: "#6f4530",
          900: "#5c3a2a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(42, 79, 21, 0.08)",
        card: "0 8px 30px -4px rgba(42, 79, 21, 0.12)",
        glow: "0 0 40px -8px rgba(249, 115, 22, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-x": "gradientX 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        "blob": "blob 18s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(1.06)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -30px) scale(1.08)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.95)" },
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #55a125 0%, #6bb534 100%)",
        "gradient-sunrise": "linear-gradient(135deg, #fb8a3a 0%, #f97316 50%, #55a125 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
