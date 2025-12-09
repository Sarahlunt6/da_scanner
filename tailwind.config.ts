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
        primary: "#29377f", // HR4Sight navy blue
        secondary: "#fbab3f", // HR4Sight yellow/orange
        accent: "#279dd8", // HR4Sight light blue
        danger: "#ef402c", // HR4Sight red
        navy: "#29377f", // HR4Sight navy blue
        lightBlue: "#279dd8", // HR4Sight light blue
        success: "#16a34a",
        warning: "#fbab3f",
      },
    },
  },
  plugins: [],
};

export default config;
