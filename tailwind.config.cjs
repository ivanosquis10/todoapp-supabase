/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '430px',
      },
      container: {
        center: true,
      },
      colors: {
        darker: {
          100: '#292929',
          200: '#B4B4B4',
        },
      },
    },
  },
  plugins: [],
}
