import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6c4cff",
        "primary-light": "#ece8ff",
        "primary-dark": "#503c96",
        secondary: "#f8f7ff",
        "text-primary": "#242235",
        "text-secondary": "#696579",
        "text-tertiary": "#777286",
        "border-light": "#eeeaf5",
        "border-default": "#e9e6f2",
        "bg-light": "#f8f7ff",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
