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
      colors: {
        primary: {
          blue: '#0057B7',
          yellow: '#FFD700',
          light: '#F8F9FA',
          dark: '#1a202c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ukrainian-pattern': "url('/images/ukrainian-pattern.svg')",
      },
      container: {
        center: true,
        padding: '1rem',
        screens: { '2xl': '1200px' },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
      },
    },
  },
  safelist: [
    // бренд-утиліти, що можуть генеруватись динамічно
    'text-primary-blue', 'text-primary-yellow',
    'bg-primary-blue', 'bg-primary-yellow', 'bg-primary-light',
    'border-primary-blue', 'border-primary-yellow',
  ],
  plugins: [],
};
