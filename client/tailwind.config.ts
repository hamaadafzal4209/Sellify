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
          400: "#FF708C", // Lighter variant: Use for subtle hover or background elements.
          500: "#FE426D", // Main color: Use for primary buttons, headings, or call-to-action elements.
          600: "#E6395E", // Darker variant: Use for hover effects on buttons.
        },
        gray: {
          100: "#F5F5F5", // Light Gray: Use for backgrounds, sections, or areas with less focus.
          900: "#333333", // Charcoal Gray: Use for text, footers, and headings for contrast.
        },
        accent: {
          500: "#42FEBD", // Mint Green: Use for accents, hover effects, or secondary buttons.
        },
      },
      fontFamily: {
        // Add your font definitions here
        sans: ["var(--font-inter)", "sans-serif"], // Inter for body text
        poppins: ["var(--font-poppins)", "sans-serif"], // Poppins for headings
      },
    },
  },
};

export default config;