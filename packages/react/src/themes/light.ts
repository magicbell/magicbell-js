import { IMagicBellTheme } from '../context/Theme';

export const fonts = {
  sans: `Inter, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, -apple-system, system`,
  mono: `ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
};

const colors = {
  bg: '#FFFFFF',
  caption: '#181B20',
  text: '#3A424D',
  ghost: '#6E7D91',
  stroke: '#EFEEF1',
  accent: '#5225C1',
  badge: '#F80808',
  bgHighlight: '#F8F5FF',
  bgActive: '#F2EDFC',
  transparent: 'transparent',
};

const prose: IMagicBellTheme['prose'] = {
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
};

const icon: IMagicBellTheme['icon'] = {
  borderColor: colors.accent,
  width: '24px',
};

const tabs: IMagicBellTheme['tabs'] = {
  margin: '-8px 0 -16px 0',
  spacing: '4px',
  fontSize: '12px',
  fontWeight: 500,
  color: colors.ghost,
  activeColor: colors.accent,
};

const header: IMagicBellTheme['header'] = {
  backgroundColor: colors.bg,
  backgroundOpacity: 1,
  borderRadius: '16px',
  fontFamily: fonts.sans,
  fontSize: '15px',
  fontWeight: 400,
  textAlign: 'left',
  textColor: colors.accent,
  textTransform: 'none',
  padding: '16px',
  borderColor: colors.stroke,
};

const footer: IMagicBellTheme['footer'] = {
  ...header,
  fontSize: '12px', // set for backward compatibility
  padding: '8px 16px',
};

const banner: IMagicBellTheme['banner'] = {
  backgroundColor: colors.bgHighlight,
  backgroundOpacity: 1,
  textColor: colors.text,
  fontFamily: fonts.sans,
  textAlign: 'left',
  fontSize: '12px',
  boxShadow: `inset 0 1px 0 0 ${colors.stroke}`,
};

const unseenBadge: IMagicBellTheme['unseenBadge'] = {
  backgroundColor: colors.badge,
  backgroundOpacity: 1,
  borderColor: 'white',
  borderRadius: '4px',
  fontFamily: fonts.sans,
  fontWeight: 400,
  fontSize: '9px',
  textAlign: 'center',
  textColor: 'white',
  textTransform: 'none',
  padding: '2px 3px',
};

const container: IMagicBellTheme['container'] = {
  backgroundColor: colors.bg,
  backgroundOpacity: 1,
  borderRadius: '8px',
  fontFamily: fonts.sans,
  fontWeight: 'inherit',
  fontSize: '16px',
  textAlign: 'left',
  textColor: colors.text,
  textTransform: 'none',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.08), 0px 5px 12px rgba(0, 0, 0, 0.16)',
  borderColor: colors.transparent,
};

const defaultNotification: IMagicBellTheme['notification']['default'] = {
  backgroundColor: colors.bg,
  backgroundOpacity: 1,
  borderRadius: '16px',
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 400,
  textAlign: 'left',
  textColor: colors.text,
  textTransform: 'none',
  margin: '8px',
  padding: '16px 8px',
  title: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 600,
    textColor: colors.caption,
  },
  hover: {
    backgroundColor: colors.bgActive,
    backgroundOpacity: 1,
  },
  state: {
    color: colors.transparent,
  },
};

const unreadNotification: IMagicBellTheme['notification']['unread'] = {
  ...defaultNotification,
  backgroundColor: colors.bgHighlight,
  hover: {
    backgroundColor: colors.bgActive,
    backgroundOpacity: 1,
  },
  state: {
    color: colors.accent,
  },
};

export const lightTheme: IMagicBellTheme = {
  prose,
  icon,
  tabs,
  header,
  footer,
  banner,
  unseenBadge,
  container,
  notification: {
    default: defaultNotification,
    unread: unreadNotification,
    unseen: unreadNotification,
  },
};
