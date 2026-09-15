/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          'primary-dark': 'var(--brand-primary-dark)',
          'primary-light': 'var(--brand-primary-light)',
          secondary: 'var(--brand-secondary)',
          'secondary-dark': 'var(--brand-secondary-dark)',
          accent: 'var(--brand-accent)',
          'accent-dark': 'var(--brand-accent-dark)',
          gold: 'var(--brand-gold)',
        }
      }
    },
  },
  plugins: [],
};
