/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef1f7',
          100: '#d5dceb',
          200: '#aab9d6',
          300: '#8096c2',
          400: '#5573ad',
          500: '#3a5590',
          600: '#2a3f6e',
          700: '#1f2f52',
          800: '#16233f',
          900: '#0f182c',
        },
        accent: {
          50: '#fef1ea',
          100: '#fdddc9',
          200: '#fabb93',
          300: '#f7995d',
          400: '#ee7a3a',
          500: '#e8622a',
          600: '#c94e1e',
          700: '#a03e18',
          800: '#7a3013',
          900: '#54210d',
        },
        gold: {
          400: '#f8c34d',
          500: '#f5a623',
          600: '#d98c12',
        },
        leaf: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
      },
    },
  },
  plugins: [],
};
