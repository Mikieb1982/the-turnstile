
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: 'var(--color-background)',
        'surface': 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'surface-dark': 'var(--color-surface-dark)',
        'surface-dark-muted': 'var(--color-surface-dark-muted)',
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'accent': 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'text': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
      },
      boxShadow: {
        'custom': 'var(--shadow-custom)',
        'custom-lg': 'var(--shadow-custom-lg)',
      }
    },
  },
  plugins: [],
};
export default config;
