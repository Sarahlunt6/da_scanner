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
        primary: "#20466F",
        secondary: "#ffd147",
        success: "#16a34a",
        warning: "#eab308",
        danger: "#dc2626",
      },
    },
  },
  plugins: [],
};

export default config;
