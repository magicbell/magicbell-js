import { IMagicBellTheme } from '../context/Theme.js';
import { DeepPartial } from '../lib/types.js';

const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  mono: `ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
};

const colors = {
  bg: '#FFFFFF',
  caption: '#0f172a',
  text: '#3A424D',
  stroke: '#e2e8f0',
  accent: '#3498F4',
  badge: '#DF4759',
  transparent: 'transparent',
};

const headerFooterProps: IMagicBellTheme['header'] & IMagicBellTheme['footer'] = {
  backgroundColor: colors.accent,
  backgroundOpacity: 1,
  borderRadius: '8px',
  fontFamily: fonts.sans,
  fontSize: '14px',
  fontWeight: 'inherit',
  textAlign: 'left',
  textColor: colors.bg,
  textTransform: 'uppercase',
};

export const classicTheme: DeepPartial<IMagicBellTheme> = {
  prose: {
    headings: colors.caption,
    links: colors.caption,
    bold: colors.caption,
    hr: colors.stroke,
    quotes: colors.text,
    quoteBorders: colors.stroke,
    captions: colors.caption,
    code: colors.text,
    preCode: colors.stroke,
    preBg: colors.text,
    thBorders: colors.stroke,
    tdBorders: colors.stroke,
    buttonBorders: colors.text,
    buttons: colors.caption,
    fontMono: fonts.mono,
  },
  icon: {
    borderColor: colors.accent,
  },
  header: {
    ...headerFooterProps,
    padding: '16px 24px',
  },
  footer: {
    ...headerFooterProps,
    padding: '12px 24px',
  },
  banner: {
    backgroundColor: colors.accent,
    backgroundOpacity: 0.1,
    textColor: colors.text,
    fontFamily: fonts.sans,
    textAlign: 'left',
    fontSize: '12px',
    boxShadow: 'none',
  },
  dialog: {
    backgroundColor: colors.bg,
    textColor: colors.text,
    accentColor: colors.accent,
  },
  unseenBadge: {
    backgroundColor: colors.badge,
    backgroundOpacity: 1,
    borderRadius: '2px',
    fontFamily: fonts.sans,
    fontWeight: 'inherit',
    fontSize: '10px',
    textAlign: 'center',
    textColor: 'white',
    textTransform: 'none',
  },
  container: {
    backgroundColor: colors.bg,
    fontFamily: fonts.sans,
    fontSize: '12px',
    textColor: colors.text,
    boxShadow: '0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04)',
  },
  notification: {
    default: {
      backgroundColor: 'transparent',
      backgroundOpacity: 0,
      borderRadius: '8px',
      fontFamily: fonts.sans,
      fontSize: '12px',
      fontWeight: 'inherit',
      textAlign: 'left',
      textColor: colors.text,
      textTransform: 'none',
      margin: '4px',
      padding: '16px 20px 16px 12px',
      title: {
        fontFamily: 'inherit',
        fontSize: '14px',
        fontWeight: 500,
        textColor: colors.caption,
      },
      hover: {
        backgroundColor: colors.accent,
        backgroundOpacity: 0.1,
      },
      state: {
        color: 'transparent',
      },
    },
    unread: {
      backgroundOpacity: 0,
      state: {
        color: colors.accent,
      },
    },
    unseen: {
      backgroundColor: colors.accent,
      backgroundOpacity: 0.05,
      state: {
        color: colors.accent,
      },
    },
  },
};
