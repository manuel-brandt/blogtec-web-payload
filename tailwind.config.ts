import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E9204F",
          yellow: "#F9E90A",
          cream: "#F5EFE8",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)", "Lato", "sans-serif"],
      },
      borderRadius: {
        pill: "50px",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
