import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      fontFamily: {
        // Use the new, clearer variable name
        sans: "var(--font-roboto)",
        heading: "var(--font-roboto)",
      },
      colors: {
        // These are CSS variables that will be dynamically set
        primary: "var(--clr-primary)",
        secondary: "var(--clr-secondary)",
        accent: "var(--clr-accent)",
        danger: "var(--clr-danger)",
        warning: "var(--clr-warning)",
        info: "var(--clr-info)",
        success: "var(--clr-success)",
        text: {
          DEFAULT: "var(--clr-text)",
          strong: "var(--clr-text-strong)",
          subtle: "var(--clr-text-subtle)",
        },
        border: "var(--clr-border)",
        surface: {
          DEFAULT: "var(--clr-surface)",
          alt: "var(--clr-surface-alt)",
        },
      },
      backgroundImage: {
        'gradient-1': 'var(--gradient-1)',
        'gradient-2': 'var(--gradient-2)',
        'gradient-3': 'var(--gradient-3)',
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
