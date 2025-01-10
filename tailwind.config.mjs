/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [require('tailwindcss-motion'),
    nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: "#F7B750",
            foreground: "#000000",
          },
          focus: "#F7B750",
        },
      },
      light: {
        colors: {
        },
      },
    },
  }),],
};
