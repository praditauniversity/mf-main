const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'background': '#F4F7FE',
        'background-mainframe': '#F1F2F6',
        'background-snow': '#FFFFFF',

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

        'secondary': '#2196F3',
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
        'error-lighter': '#F8E5E5',

        'orange': '#FDAC42',
        'orange-light': '#FCCC75',
        'orange-lighter': '#FEF0D6',
        'orange-dark': '#FF8800',
        'orange-darker': '#E54C00',

        'typo-dark': '#252B4B',
        'typo-subtitle': '#505F73',
        'typo-normal': '#475467',
        'typo-light': '#A3AED0',
        'typo-lighter': '#CCD1D7',
        'typo-lite': '#9EA9CB',
        'typo-snow': '#FAFAFA',

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
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '21': 'repeat(21, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '23': 'repeat(23, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
        '25': 'repeat(25, minmax(0, 1fr))',


      },

      gridColumn: {
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-18': 'span 18 / span 18',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
}
