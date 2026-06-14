import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury art-gallery palette
        ivory: "#F6F2EA",
        "warm-white": "#FCFAF6",
        beige: "#E7DECF",
        "soft-beige": "#D8CDB8",
        sand: "#C9BBA0",
        charcoal: "#1A1815",
        "deep-charcoal": "#0E0D0B",
        graphite: "#2A2723",
        gold: "#B8924A",
        "gold-light": "#D8B872",
        "gold-soft": "#E6D2A8",
        clay: "#8B6F47",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "11xl": ["13rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        luxe: "0.28em",
        "luxe-sm": "0.18em",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxe-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        silk: "cubic-bezier(0.65, 0.05, 0, 1)",
      },
      boxShadow: {
        soft: "0 20px 60px -24px rgba(26, 24, 21, 0.28)",
        lift: "0 40px 90px -40px rgba(26, 24, 21, 0.45)",
        gold: "0 18px 50px -20px rgba(184, 146, 74, 0.5)",
        glass: "0 8px 40px -12px rgba(26, 24, 21, 0.18)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(120deg, #B8924A 0%, #D8B872 45%, #8B6F47 100%)",
        "ivory-glow":
          "radial-gradient(120% 120% at 50% 0%, #FCFAF6 0%, #F6F2EA 45%, #E7DECF 100%)",
        "charcoal-fade":
          "linear-gradient(180deg, rgba(14,13,11,0) 0%, rgba(14,13,11,0.85) 100%)",
        noise: "url('/textures/noise.svg')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 1.8s infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
