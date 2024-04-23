/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor: {
        'menu-items': '#f0f8ff',
      },
      screens: {
        'mobile-s': '320px',
        'mobile-m': '375px',
        'mobile-l': '425px',
        'mobile-hd': '720px',
        'mobile-full-hd': '1080px',
        'mobile-qhd': '1125px',
        'desktop-hd': '1360px',
        'desktop-full-hd': '1920px',
      },
      spacing: {
        13: '3.25rem',
        68: '17.5rem',
        main: '[calc(100% - 280px)]',
        100: '25rem',
        110: '30rem',
        120: '35rem',
        130: '40rem',
        140: '45rem',
        150: '50rem',
        160: '55rem',
        170: '60rem',
        180: '65rem',
        190: '70rem',
        200: '75rem',
        210: '80rem',
        220: '85rem',
        230: '90rem',
        240: '95rem',
        242: '96rem',
      },
      scale: {
        500: '5',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-track': {
            background: '#132a44',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#0d2035',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
