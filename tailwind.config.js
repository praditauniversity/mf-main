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

        'tertiary': '#8AB73A',
        'tertiary-800': '#82A027',
        'tertiary-dark': '#88B135',
        'tertiary-light': '#F0F6E7',
        'tertiary-tertiary': '#C5DB9D',

        'grey': '#8B8F9F',
        'grey-light': '#ACAFBF',
        'grey-lighter': '#CCD1D7',
        'grey-border': '#ECEEF0',
        'grey-dark': '#7D8292',
        'grey-lite': '#2A4157',
        'grey-icon': '#33363F',
        
        'error': '#DA4747',
        'error-light': '#DD7474',
        'error-dark': '#C62828',

        'orange': '#FDAC42',
        'orange-light': '#FCCC75',
        'orange-lighter': '#FEF0D6',
        'orange-dark': '#FF8800',
        'orange-darker': '#E54C00',

        'text-dark': '#252B4B',
        'text-subtitle': '#505F73',
        'text-normal': '#475467',
        'text-light': '#A3AED0',
        'text-lighter': '#CCD1D7',
        'text-lite': '#9EA9CB',
        'text-snow': '#FAFAFA',

        'table-dark': '#F5F6FA',
        'table-light': '#E9EDF7',

        'black': '#101828',
        'black-light': '#161E2E',
        
        'warning': '#FDDD48',
        'warning-light': '#FDED72',
        'warning-dark': '#FFC107',

        'teal': '#73DFE7',
        'teal-light': '#A9EFF2',
        'teal-dark': '#00CFDE',

        'tag-text': '#505F73',
        'tag-bg': '#EEEEEE',

        'gantt-border': '#EBEBF0',
        'gantt-stripe-light': '#FAFAFC',
        'gantt-stripe-dark': '#EAEEF4',

      },

      fontFamily: {
        'sans': ['Inter', 'Roboto', 'Helvetica', 'sans-serif'],
        'serif': ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        'mono': ['Iosevka', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        'display': ['Oswald'],
        'body': ['Inter', 'Roboto', 'Helvetica', 'sans-serif'],
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
