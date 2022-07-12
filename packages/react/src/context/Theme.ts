export interface IElementTheme {
  backgroundColor: string;
  backgroundOpacity: number;
  borderRadius: string;
  borderColor?: string;
  fontFamily: string;
  fontSize: string;
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  textColor: string;
  textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
  padding?: string;
  fontWeight: string;
}

interface NotificationTheme extends IElementTheme {
  margin: string;
  hover: {
    backgroundColor: string;
    backgroundOpacity: number;
  };
  title: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    textColor: string;
  };
  state: {
    color: string;
  };
}

export interface IMagicBellTheme {
  icon: {
    borderColor: string;
    width: string;
  };
  unseenBadge: Omit<IElementTheme, 'borderColor' | 'padding'>;
  header: IElementTheme;
  container: IElementTheme & { boxShadow?: string };
  footer: IElementTheme;
  banner: {
    backgroundColor: string;
    backgroundOpacity: number;
    textColor: string;
    boxShadow: string;
    fontFamily: string;
    fontSize: string;
    textAlign: string;
  };
  notification: {
    default: NotificationTheme;
    unread: NotificationTheme;
    unseen: NotificationTheme;
  };
}

const blue = '#3498F4';
const red = '#DF4759';
const black = '#3A424D';

// prettier-ignore
const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
const fontSize = '14px';
const fontWeight = 'inherit';
const textAlign = 'left';
const textTransform = 'none';

const notification: NotificationTheme = {
  backgroundColor: 'transparent',
  backgroundOpacity: 0,
  borderRadius: '8px',
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  textColor: black,
  textTransform,
  margin: '4px',
  padding: '16px 20px 16px 12px',
  title: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 500,
    textColor: 'inherit',
  },
  hover: {
    backgroundColor: blue,
    backgroundOpacity: 0.1,
  },
  state: {
    color: 'transparent',
  },
};

export const defaultTheme: IMagicBellTheme = {
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
    fontWeight,
    textAlign,
    textColor: 'white',
    textTransform: 'uppercase',
    padding: '16px 24px',
    borderColor: undefined,
  },
  footer: {
    backgroundColor: blue,
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily,
    fontSize: fontSize,
    fontWeight,
    textAlign,
    textColor: 'white',
    textTransform,
    padding: '12px 24px',
    borderColor: undefined,
  },
  banner: {
    backgroundColor: blue,
    backgroundOpacity: 0.1,
    textColor: black,
    fontFamily,
    textAlign,
    fontSize,
    boxShadow: 'none',
  },
  unseenBadge: {
    backgroundColor: red,
    backgroundOpacity: 1,
    borderRadius: '2px',
    fontFamily,
    fontWeight,
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
    fontWeight,
    fontSize: '14px',
    textAlign,
    textColor: black,
    textTransform,
    boxShadow: '0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04)',
  },
  notification: {
    default: notification,
    unread: {
      ...notification,
      backgroundColor: blue,
      backgroundOpacity: 0,
      state: {
        color: blue,
      },
    },
    unseen: {
      ...notification,
      backgroundColor: blue,
      backgroundOpacity: 0.05,
      state: {
        color: blue,
      },
    },
  },
};
