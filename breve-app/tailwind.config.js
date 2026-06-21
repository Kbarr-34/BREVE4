/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#060f06', 900: '#0a1a0a', 850: '#0d2210', 800: '#112614',
          750: '#152c18', 700: '#1a3520', 600: '#254a2a', 500: '#336338',
          400: '#4a8c52', 300: '#65b56f', 200: '#8fd498', 100: '#c2ecc8',
        },
        lime: { 400: '#7ec84a', 500: '#6ab83a', 600: '#56a82c', }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse2: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.6s ease-out 0.1s forwards',
        'fade-up-delay-2': 'fadeUp 0.6s ease-out 0.2s forwards',
        'fade-up-delay-3': 'fadeUp 0.6s ease-out 0.3s forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse2': 'pulse2 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}