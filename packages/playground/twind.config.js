/** @type {import('twind').Configuration} */
export default {
  darkMode: 'class',
  mode: 'silent',
  theme: {
    extend: {
      fontFamily: {
        sans: ['HarmoniaSans', 'Helvetica', 'Arial', 'sans-serif'],
        mono: [
          'GT America',
          'Menlo',
          'Monaco',
          'Consolas',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        purple: {
          900: '#532F70',
          800: '#6113A3',
          700: '#7217BD',
          600: '#8E45CA',
          500: '#AA74D7',
          400: '#C7A2E5',
          300: '#E3D1F2',
          200: '#F1E8F9',
          100: '#F8F3FB',
        },
        pink: {
          900: '#E85E97',
          800: '#ED77A8',
        },
        blue: {
          700: '#2C4772',
          600: '#2B518F',
          500: '#3E6EB8',
          400: '#7394C9',
          300: '#A5BBE0',
        },
        red: {
          600: '#E8383A',
          400: '#EA6F70',
          300: '#F39798',
          200: '#FAC5C5',
        },
        orange: {
          500: '#ED8525',
        },
        green: {
          500: '#3ECA6E',
        },
        gray: {
          900: '#15091F',
          800: '#3A424D',
          700: '#545F6F',
          600: '#6E7D91',
          500: '#909BAB',
          400: '#C3C9D2',
          300: '#D4D9DF',
          200: '#E5E8EC',
          100: '#F6F7F8',
        },
      },
    },
  },
};
