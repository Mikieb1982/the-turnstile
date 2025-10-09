// tailwind.config.ts

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: { navy: '#0B1020', 700: '#1E3A8A', 600: '#2563EB' },
        background: { DEFAULT: '#F3F6FF', muted: '#E6EDFF', accent: '#DAE4FF' },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F1F5FF',
          strong: '#E2ECFF',
        },
        text: {
          DEFAULT: '#1E2A44',
          subtle: 'rgb(30 42 68 / <alpha-value>)',
          strong: '#0B1020',
        },
        border: 'rgb(15 23 42 / <alpha-value>)',
        primary: '#1E3A8A',
        secondary: '#2563EB',
        accent: '#F59E0B',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#38BDF8',
        success: '#22D3EE',
        field: { 600: '#15803D' },   // green
        try: { 600: '#DC2626' },     // red
        amber: { 500: '#F59E0B' },
      },
      boxShadow: {
        soft: '0 6px 18px rgba(0,0,0,0.18)',
        card: '0 30px 60px -35px rgba(11, 16, 32, 0.6)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
}

export default config
