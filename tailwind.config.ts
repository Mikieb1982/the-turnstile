// tailwind.config.ts

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          navy: '#080B16',
          crimson: '#B91C1C',
          ember: '#F97316',
        },
        background: { DEFAULT: '#06050E', muted: '#0B0F1C', accent: '#12172A' },
        surface: {
          DEFAULT: '#11182C',
          alt: '#172138',
          strong: '#0A0F1C',
        },
        text: {
          DEFAULT: '#E2E8F0',
          subtle: 'rgb(148 163 184 / <alpha-value>)',
          strong: '#F8FAFC',
        },
        border: 'rgb(94 106 133 / <alpha-value>)',
        primary: '#EF4444',
        secondary: '#7C3AED',
        accent: '#FACC15',
        danger: '#DC2626',
        warning: '#F97316',
        info: '#38BDF8',
        success: '#34D399',
        field: { 600: '#15803D' },   // green
        try: { 600: '#DC2626' },     // red
        amber: { 500: '#FACC15' },
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
