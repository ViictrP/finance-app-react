/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      nunito: ['Nunito', 'sans-serif']
    },
    extend: {
      borderRadius: {
        md: '4px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tw-elements/dist/plugin')
  ],
}
