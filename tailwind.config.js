/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#09090b',
          raised: '#111113',
          card: '#141416',
        },
        ink: {
          600: '#272738',
          700: '#1e1e2c',
          800: '#161622',
          850: '#11111b',
          900: '#0c0c14',
          950: '#07070c',
        },
        accent: {
          DEFAULT: '#2dd4bf',
          dim: '#14b8a6',
          glow: 'rgba(45, 212, 191, 0.35)',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        signal: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        cool: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
        },
      },
      boxShadow: {
        card: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        glow: '0 0 50px -10px rgba(45, 212, 191, 0.3)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45, 212, 191, 0.15), transparent 70%)',
        'grid-faint': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'eq-bar': 'eq-bar 0.9s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '70%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'eq-bar': {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
};
