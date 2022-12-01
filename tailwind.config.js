const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'background': '#F4F7FE',

        'dark': '#6E7383',
        'darker': '#3F4555',
        'darkest': '#252B4B',

        'light': '#EBEBF0',
        'lighter': '#F2F2F5',
        'lightest': '#FAFAFC',

        'primary': '#673AB7',
        'primary-800': '#4527A0',
        'primary-dark': '#5E35B1',
        'primary-light': '#EDE7F6',
        'primary-primary': 'B39DDB',

        'secondary': '#5E35B1',
        'secondary-800': '#1565C0',
        'secondary-dark': '#1E88E5',
        'secondary-secondary': '#90CAF9',
        'secondary-light': '#E3F2FD',

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
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        ".no-scrollbar::-webkit-scrollbar": {
          "display": " none"
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        }
      })
    })
  ],
}
