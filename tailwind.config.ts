import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#FAF5EE",
        "bronzed-gold": "#C9883A",
        espresso: "#1C1008",
        peach: "#F5C9A0",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
