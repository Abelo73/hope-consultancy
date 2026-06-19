/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Rich dark teal / forest ink
        ink: {
          50:  "#F0F7F5",
          100: "#D4EBE4",
          200: "#A3D0C4",
          300: "#6AAFA1",
          400: "#3D8C80",
          500: "#2A6B60",
          600: "#1E514A",
          700: "#163C37",
          800: "#0F2B27",
          900: "#091F1B",
          950: "#050F0D",
        },
        // Vibrant amber/gold seal
        seal: {
          50:  "#FFF8EC",
          100: "#FFEECA",
          200: "#FFD98A",
          300: "#FFC14D",
          400: "#F5A623",
          500: "#E08A0E",
          600: "#C07008",
          700: "#9A5606",
          800: "#7A4206",
          900: "#5A3008",
        },
        // Warm cream paper
        paper: {
          50:  "#FEFDF9",
          100: "#FAF8F2",
          200: "#F2EDE0",
          300: "#E6DECA",
          400: "#D4C9A8",
        },
        // Deep dark for dark mode
        abyss: {
          900: "#080C0B",
          950: "#040807",
        },
      },
      fontFamily: {
        serif: ["'Noto Serif Ethiopic'", "'Cormorant Garamond'", "serif"],
        sans:  ["'Noto Sans Ethiopic'", "'Inter'", "system-ui", "sans-serif"],
        mono:  ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        xs:   ["clamp(11px, 1.2vw, 12px)",  { lineHeight: "1.5" }],
        sm:   ["clamp(13px, 1.4vw, 14px)",  { lineHeight: "1.6" }],
        base: ["clamp(15px, 1.6vw, 16.5px)", { lineHeight: "1.75" }],
        lg:   ["clamp(17px, 1.8vw, 19px)",  { lineHeight: "1.7" }],
        xl:   ["clamp(20px, 2.2vw, 23px)",  { lineHeight: "1.5" }],
        "2xl": ["clamp(24px, 3vw, 30px)",    { lineHeight: "1.3" }],
        "3xl": ["clamp(30px, 4.2vw, 42px)",  { lineHeight: "1.15" }],
        "4xl": ["clamp(38px, 5.5vw, 58px)",  { lineHeight: "1.08" }],
        "5xl": ["clamp(48px, 7.5vw, 80px)",  { lineHeight: "1.02" }],
      },
      boxShadow: {
        seal:       "0 8px 40px -8px rgba(245,166,35,0.45), 0 2px 12px rgba(245,166,35,0.2)",
        "seal-lg":  "0 16px 60px -12px rgba(245,166,35,0.5), 0 4px 20px rgba(245,166,35,0.25)",
        card:       "0 2px 8px rgba(9,31,27,0.06), 0 12px 32px -8px rgba(9,31,27,0.12)",
        "card-dark": "0 2px 12px rgba(0,0,0,0.4), 0 16px 48px -10px rgba(0,0,0,0.6)",
        glow:       "0 0 40px rgba(245,166,35,0.25)",
        "glow-teal": "0 0 40px rgba(61,140,128,0.3)",
        glass:      "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "hero-light": "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(61,140,128,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(245,166,35,0.15) 0%, transparent 50%), radial-gradient(ellipse 50% 70% at 50% 100%, rgba(61,140,128,0.10) 0%, transparent 60%), #FAF8F2",
        "hero-dark":  "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(61,140,128,0.22) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(245,166,35,0.18) 0%, transparent 50%), radial-gradient(ellipse 50% 70% at 50% 100%, rgba(61,140,128,0.12) 0%, transparent 60%), #080C0B",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        stampIn: {
          "0%":   { opacity: "0", transform: "scale(1.6) rotate(-12deg)" },
          "60%":  { opacity: "1", transform: "scale(0.93) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-8deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px) rotate(2deg)" },
          "50%":      { transform: "translateY(-14px) rotate(2deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.05)" },
        },
        drawLine: {
          "0%":   { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp:        "fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
        fadeIn:        "fadeIn 0.6s ease forwards",
        scaleIn:       "scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        slideRight:    "slideRight 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
        slideLeft:     "slideLeft 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
        stampIn:       "stampIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        floatY:        "floatY 4s ease-in-out infinite",
        shimmer:       "shimmer 2.5s linear infinite",
        gradientShift: "gradientShift 6s ease infinite",
        pulseGlow:     "pulseGlow 2.5s ease-in-out infinite",
        slideDown:     "slideDown 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee:       "marquee 28s linear infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
