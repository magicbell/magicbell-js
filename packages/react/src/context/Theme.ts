export interface IElementTheme {
  backgroundColor: string;
  backgroundOpacity: number;
  borderRadius: string;
  fontFamily: string;
  fontSize: string;
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  textColor: string;
  textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
}

export interface IMagicBellTheme {
  icon: {
    borderColor: string;
    width: string;
  };
  unseenBadge: IElementTheme;
  header: IElementTheme;
  container: IElementTheme;
  footer: IElementTheme;
  notification: {
    default: IElementTheme;
    unread: IElementTheme;
    unseen: IElementTheme;
  };
}

const blue = '#3498F4';
const red = '#DF4759';
const black = '#3A424D';

// prettier-ignore
const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
const fontSize = '14px';
const textAlign = 'left';
const textTransform = 'none';

export const defaultTheme = {
  icon: {
    borderColor: blue,
    width: '24px',
  },
  header: {
    backgroundColor: blue,
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily,
    fontSize,
    textAlign,
    textColor: 'white',
    textTransform,
  },
  footer: {
    backgroundColor: blue,
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily,
    fontSize: fontSize,
    textAlign,
    textColor: 'white',
    textTransform,
  },
  unseenBadge: {
    backgroundColor: red,
    backgroundOpacity: 1,
    borderRadius: '2px',
    fontFamily,
    fontSize: '10px',
    textAlign: 'center',
    textColor: 'white',
    textTransform,
  },
  container: {
    backgroundColor: '#FFFFFF',
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily,
    fontSize: '14px',
    textAlign,
    textColor: black,
    textTransform,
  },
  notification: {
    default: {
      backgroundColor: blue,
      backgroundOpacity: 0.1,
      borderRadius: '8px',
      fontFamily,
      fontSize,
      textAlign,
      textColor: black,
      textTransform,
    },
    unread: {
      backgroundColor: blue,
      backgroundOpacity: 0,
      borderRadius: '8px',
      fontFamily,
      fontSize,
      textAlign,
      textColor: black,
      textTransform,
    },
    unseen: {
      backgroundColor: blue,
      backgroundOpacity: 0.05,
      borderRadius: '8px',
      fontFamily,
      fontSize,
      textAlign,
      textColor: black,
      textTransform,
    },
  },
} as IMagicBellTheme;
