import type { Config } from "tailwindcss";

// This is a shared config for Tailwind CSS
// It's used by both the `admin` and `frontend` apps

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)", "sans-serif"],
        default: ["var(--font-default)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;