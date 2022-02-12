import { apply, css } from 'twind/css';

const join = (parts) => parts.join('-');

/** @type {import('twind').Configuration} */
const config = {
  darkMode: 'class',
  mode: 'silent',
  plugins: {
    bg: (parts) =>
      css`
        background-color: var(--colors-bg-${join(parts)});
      `,
    fg: (parts) => {
      const name = `--colors-fg-${join(parts)}`;

      return css`
        color: var(${name});

        &:is(a):focus,
        &:is(a):hover,
        &:is(a)[data-active='true'],
        &:is(button):focus,
        &:is(button):hover,
        &:is(button)[data-active='true'] {
          outline: none;
          color: var(${name}-active, var(${name}));
        }
      `;
    },

    'flex-row': apply`
      flex items-center justify-center
    `,

    popper: () => css`
      z-index: 999;
      background: var(--colors-bg-popper);
      color: var(--colors-fg-popper);

      @apply inline-bock rounded-md shadow-md;

      &:before {
        content: '';
        position: absolute;
        height: 20px;
        width: 100%;
        top: 0;
        transform: translateY(-100%);
        z-index: -1;
      }
    `,

    arrow: ([position]) => {
      return css`
        &,
        &::before {
          @apply absolute w-8 h-8 rounded-md;
          background: inherit;
        }

        & {
          visibility: hidden;
          ${position}: -4px;
        }

        &::before {
          visibility: visible;
          content: '';
          transform: rotate(45deg);
        }
      `;
    },

    'line-clamp': ([lines]) => css`
      display: -webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `,

    perspective: ([distance]) => css`
      perspective: ${distance}px;
    `,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Moderat', 'Helvetica', 'Arial', 'sans-serif'],
        mono: [
          'GT America',
          'Menlo',
          'Monaco',
          'Consolas',
          'Courier New',
          'monospace',
        ],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
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

export default config;
