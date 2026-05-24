/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "background-deep": "var(--background-deep)",
        "background-base": "var(--background-base)",
        "background-elevated": "var(--background-elevated)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        "foreground-subtle": "var(--foreground-subtle)",
        accent: "var(--accent)",
        "accent-bright": "var(--accent-bright)",
        "accent-glow": "var(--accent-glow)",
        "border-default": "var(--border-default)",
        "border-hover": "var(--border-hover)",
        "border-accent": "var(--border-accent)",
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
        display: ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
        "card-hover":
          "0 0 0 1px rgba(255,255,255,0.10), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)",
        "accent-glow":
          "0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)",
        "inner-highlight": "inset 0 1px 0 0 rgba(255,255,255,0.1)",
        elevated:
          "0 0 0 1px rgba(255,255,255,0.06), 0 4px 30px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.15)",
        none: "0 0 #0000",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        200: "200ms",
        250: "250ms",
        300: "300ms",
        600: "600ms",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-16px) rotate(0.5deg)" },
          "66%": { transform: "translateY(-8px) rotate(-0.5deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(16px) rotate(-0.5deg)" },
          "66%": { transform: "translateY(8px) rotate(0.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        "blob-pulse": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.4" },
          "33%": { transform: "scale(1.08) rotate(0.8deg)", opacity: "0.6" },
          "66%": { transform: "scale(0.94) rotate(-0.6deg)", opacity: "0.3" },
        },
        "spotlight-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float 10s ease-in-out infinite",
        "float-medium": "float 8s ease-in-out infinite",
        "float-reverse": "float-reverse 9s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "blob-pulse": "blob-pulse 12s ease-in-out infinite",
        "spotlight-fade": "spotlight-fade 0.3s ease-out forwards",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(to right, #5E6AD2, #818CF8, #5E6AD2)",
        "text-gradient": "linear-gradient(to bottom, #EDEDEF, rgba(255,255,255,0.7))",
        "surface-gradient": "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        "border-gradient": "linear-gradient(to bottom, rgba(94,106,210,0.3), transparent)",
      },
    },
  },
  plugins: [],
};
