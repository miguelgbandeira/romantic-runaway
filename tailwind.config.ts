import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        valentine: {
          primary: "#FF719A",
          secondary: "#FFA99F",
          accent: "#FFE29F",
        },
      },
      keyframes: {
        "move-away": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(var(--mouse-x, 100px), var(--mouse-y, 100px))" },
        },
        "celebrate": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "move-away": "move-away 0.3s ease-out forwards",
        "celebrate": "celebrate 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
