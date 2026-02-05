/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          body: "var(--bg-body)",
          content: "var(--bg-content)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          link: "var(--text-link)",
          linkHover: "var(--text-link-hover)",
        },
        border: {
          DEFAULT: "var(--border-color)",
          link: "var(--border-link)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        normal: "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
