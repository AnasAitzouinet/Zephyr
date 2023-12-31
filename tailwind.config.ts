import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gt": "linear-gradient(90deg, rgb(8, 8, 8) 15%, transparent 100%)",
      },
      screens: {
        l: "425px",
        t: "768px",
        lt: "1024px",
        xl: "1440px",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/forms"),
  require('@tailwindcss/aspect-ratio'),

  ],
};
export default config;
