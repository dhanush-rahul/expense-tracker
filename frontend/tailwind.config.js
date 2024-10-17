/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          'overflow': 'scroll',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}

