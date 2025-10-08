// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: { 700: '#1E3A8A', 600: '#2563EB' },
        field: { 600: '#15803D' },   // green
        try: { 600: '#DC2626' },     // red
        amber: { 500: '#F59E0B' },
      },
      boxShadow: { soft: '0 6px 18px rgba(0,0,0,0.18)' },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
} satisfies Config
