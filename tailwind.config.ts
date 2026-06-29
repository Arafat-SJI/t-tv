import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: "hsl(var(--brand) / <alpha-value>)",
        "brand-accent": "hsl(var(--brand-accent) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 0 20px rgba(255, 140, 26, 0.4), 0 0 40px rgba(255, 140, 26, 0.15)",
        "brand-lg":
          "0 0 30px rgba(255, 140, 26, 0.5), 0 0 60px rgba(255, 0, 180, 0.12)",
        "brand-sm": "0 0 15px rgba(255, 140, 26, 0.35)",
        "brand-inner": "inset 0 0 20px rgba(255, 140, 26, 0.08)",
      },
      animation: {
        "pulse-brand": "pulse-brand 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "neo-flicker": "neo-flicker 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-brand": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(255, 119, 0, 0.3), 0 0 40px rgba(255, 119, 0, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(255, 119, 0, 0.55), 0 0 60px rgba(255, 0, 180, 0.15)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "neo-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.88" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.92" },
          "97%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
