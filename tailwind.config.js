/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--clr-primary)',
        secondary: 'var(--clr-secondary)',
        accent: 'var(--clr-accent)',
        danger: 'var(--clr-danger)',
        warning: 'var(--clr-warning)',
        info: 'var(--clr-info)',
        success: 'var(--clr-success)',
        surface: 'var(--clr-surface)',
        'surface-alt': 'var(--clr-surface-alt)',
        'text-strong': 'var(--clr-text-strong)',
        text: 'var(--clr-text)',
        'text-subtle': 'var(--clr-text-subtle)',
        border: 'var(--clr-border)',
      },
      borderRadius: {
        md: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.06)',
        focus: '0 0 0 2px rgba(239, 68, 68, .4)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
