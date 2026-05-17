import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { primary: "#0A0A0A", elevated: "#131313" },
        accent: { gold: "#D4A574", goldDim: "#8A6A40" },
        text: { primary: "#E8E8E8", secondary: "#8A8A8A", muted: "#4A4A4A" },
        line: "rgba(212, 165, 116, 0.18)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      letterSpacing: { wide2: "0.18em", wide3: "0.32em" },
      transitionTimingFunction: { cinema: "cubic-bezier(0.16, 1, 0.3, 1)" }
    }
  },
  plugins: []
};
export default config;
