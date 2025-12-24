import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // We name these to match the "animate-text" class in your component
        text: "text 5s ease infinite",
        "text-reverse": "textReverse 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%": { "background-position": "0 0" },
          "50%": { "background-position": "200px 0" }, // Panning effect
          "100%": { "background-position": "0 0" },
        },
        textReverse: {
          "0%": { "background-position": "0 0" },
          "50%": { "background-position": "-200px 0" }, // Panning opposite way
          "100%": { "background-position": "0 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
