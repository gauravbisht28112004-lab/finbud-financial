import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#0d2252',
          deep: '#060F1E',
        },
        blue: {
          brand: '#1B4FD8',
          light: '#2D6BE4',
        },
        teal: {
          brand: '#00B4D8',
        },
        gold: {
          DEFAULT: '#F4A524',
          light: '#FFD166',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      boxShadow: {
        'brand-sm': '0 2px 12px rgba(27,79,216,0.08)',
        'brand-md': '0 8px 32px rgba(27,79,216,0.14)',
        'brand-lg': '0 20px 60px rgba(27,79,216,0.18)',
        'gold': '0 4px 20px rgba(244,165,36,0.35)',
        'gold-lg': '0 8px 30px rgba(244,165,36,0.5)',
      },
    },
  },
  plugins: [],
}
export default config
