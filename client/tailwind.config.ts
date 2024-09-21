import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFE4EB", // Very light
          200: "#FFBCCD", // Light
          300: "#FF93AE", // Lighter
          400: "#FF708C", // Light variant
          500: "#FE426D", // Main color
          600: "#E6395E", // Dark variant
          700: "#CC3251", // Darker
          800: "#B32444", // Even darker
          900: "#991938", // Darkest
        },        
        gray: {
          100: "#F5F5F5", // Light gray
          900: "#333333", // Charcoal gray
        },
        accent: {
          500: "#42FEBD", // Mint green
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Inter for body text
        poppins: ["var(--font-poppins)", "sans-serif"], // Poppins for headings
      },
      keyframes: {
        "sheet-open": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "sheet-close": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
      },
      animation: {
        "sheet-open": "sheet-open 0.3s ease-out",
        "sheet-close": "sheet-close 0.3s ease-in",
      },
    },
  },
  plugins: [],
};

export default config;