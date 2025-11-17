// tailwind.config.ts
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
        // --- New Rugby League Colors ---
        // Dark Mode Base (Deep Navy/Slate)
        "primary-dark": "#0F172A", // Deep Navy Slate
        "secondary-dark": "#1E293B", // Darker Card Background
        
        // Old colors being repurposed or removed
        "accent-blue": "#00bcd4", // Keeping for potential legacy use, but updating its theme in accents
        "light-gray": "#cbd5e0", 
        
        // Sports Brand Colors - Energetic Blue and Gold!
        primary: "#FDCF00", // Bright Gold/Yellow - Action/Accent
        secondary: "#004F9F", // Deep Sporty Blue - Main Brand Color
        
        // Semantic colors using CSS variables
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        
        // Additional accent colors for variety (Updated for the new theme)
        accent: {
          gold: "#FDCF00", // Matches new primary
          crimson: "#FF4081", // Bright Red/Pink for contrast/score
          navy: "#0c343d",
          cream: "#fff2cc",
        }
      },
      fontFamily: {
        // Display font for headings - bold and impactful
        display: ["var(--font-bebas-neue)", "sans-serif"], // Updated
        // Body font for readability
        body: ["var(--font-inter)", "system-ui", "sans-serif"], // Updated
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
        // Updated glow colors for Gold (#FDCF00) and Crimson (#FF4081)
        'card-glow-gold': '0 0 20px -5px rgba(253, 207, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'card-glow-crimson': '0 0 20px -5px rgba(255, 64, 129, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
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
        // Updated matchday gradient to use the new Deep Blue and Crimson accent
        'gradient-matchday': 'linear-gradient(135deg, #004F9F, #FF4081)',
      }
    },
  },
  plugins: [],
};
export default config;
