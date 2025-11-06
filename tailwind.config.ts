import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sports brand colors - energetic and bold
        primary: "#32FF84", // Keep your existing primary
        secondary: "#A768FF", // Keep your existing secondary
        
        // Rugby League inspired palette
        navy: "rgb(var(--color-navy) / <alpha-value>)",
        crimson: "rgb(var(--color-crimson) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        
        // Semantic colors using CSS variables
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        
        // Additional accent colors for variety
        accent: {
          gold: "#ffe374",
          crimson: "#4c1130",
          navy: "#0c343d",
          cream: "#fff2cc",
        }
      },
      fontFamily: {
        // Display font for headings - bold and impactful
        display: ["var(--font-teko)", "Impact", "sans-serif"],
        // Body font for readability
        body: ["var(--font-roboto)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Responsive, energetic sizing for sports content
        'display-xl': ['3.5rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
        'display-lg': ['2.5rem', { lineHeight: '1.1', letterSpacing: '0.02em', fontWeight: '700' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '600' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-glow-gold': '0 0 20px -5px rgba(255, 227, 116, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'card-glow-crimson': '0 0 20px -5px rgba(76, 17, 48, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        pulseScore: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'pulse-score': 'pulseScore 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'shimmer': 'shimmer 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-matchday': 'linear-gradient(135deg, var(--color-navy), var(--color-crimson))',
      }
    },
  },
  plugins: [],
};
export default config;
