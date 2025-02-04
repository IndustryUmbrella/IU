import { Afacad } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        primary: "#090909",
        disabled: "#ccc",
      },
      backgroundColor: {
        primary: "#090909",
      },
      padding: {
        desktop: "64px",
        tablet: "24px",
        mobile: "16px",
      },
      fontFamily: {
        afacad: ["Afacad", "sans-serif"],
        aboreto: ["Aboreto", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
