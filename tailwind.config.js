const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'background': '#F4F7FE',
        'black-800': '#252B4B',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        ".no-scrollbar::-webkit-scrollbar": {
            "display":" none"
        },
        ".no-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none"
        }
      })
    })
  ],
}
