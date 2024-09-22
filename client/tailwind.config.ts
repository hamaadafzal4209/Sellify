import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFE4EB",
          200: "#FFBCCD",
          300: "#FF93AE",
          400: "#FF708C",
          500: "#FE426D", // Main color
          600: "#E6395E",
          700: "#CC3251",
          800: "#B32444",
          900: "#991938",
        },
        gray: {
          100: "#F5F5F5",
          900: "#333333",
        },
        accent: {
          500: "#42FEBD", // Mint green
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
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