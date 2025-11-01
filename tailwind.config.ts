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
        "primary": "#32FF84",
        "secondary": "#A768FF",
        "accent": "#ffc107",
        "background-light": "#f6f8f7",
        "background-dark": "#102217",
        "card-dark": "#1A2C21",
        "surface-dark": "rgba(40, 56, 47, 0.5)",
        "star-yellow": "#FFD700",
      },
      fontFamily: {
        "display": ["Teko", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-glow': '0 0 20px -5px rgba(50, 255, 132, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
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
