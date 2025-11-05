import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Enable class-based dark mode
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. Define colors semantically using CSS variables
      colors: {
        // Your brand colors
        primary: "#32FF84",
        secondary: "#A768FF",
        accent: "#FFD700", // Using your 'star-yellow' as accent

        // Semantic colors
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
      },
      fontFamily: {
        // Kept your existing font setup
        "display": ["var(--font-teko)", "sans-serif"],
        "body": ["var(--font-roboto)", "Inter", "sans-serif"],
      },
      borderRadius: {
        // Kept your existing border radius setup
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      boxShadow: {
        // Kept your existing shadow setup
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-glow': '0 0 20px -5px rgba(50, 255, 132, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        // Kept your existing keyframes
        pulseScore: {
            '0%, 100%': { transform: 'scale(1)', color: '#30ff8b' },
            '50%': { transform: 'scale(1.05)', color: '#6affb2' },
        },
      },
      animation: {
          'pulse-score': 'pulseScore 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
