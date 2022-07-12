import { defaultMagicBellTheme, IMagicBellTheme } from '../src';
import { DeepPartial } from '../src/lib/types';

export const themes: Record<
  string,
  {
    name: string;
    background: string;
    theme: DeepPartial<IMagicBellTheme>;
  }
> = {
  default: {
    name: 'default',
    background: '#ffffff',
    theme: defaultMagicBellTheme,
  },
  light: {
    name: 'light',
    background: '#ffffff',
    theme: {
      icon: {
        borderColor: '#5225C1',
        width: '24px',
      },
      header: {
        padding: '16px',
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        borderRadius: '16px',
        borderColor: 'hsl(257, 5%, 90%)',
        fontFamily: 'Inter',
        fontSize: '15px',
        fontWeight: 'normal',
        textColor: '#5225C1',
        textAlign: 'left',
        textTransform: 'none',
      },
      footer: {
        padding: '8px 16px',
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        borderRadius: '8px',
        borderColor: 'hsl(257, 5%, 90%)',
        fontFamily: 'Inter',
        fontSize: '12px',
        textColor: '#5225C1',
        textAlign: 'left',
        textTransform: 'none',
      },
      banner: {
        boxShadow: '0 -1px 0 0 hsl(257deg 5% 90%)',
        backgroundColor: '#F8F5FF',
        backgroundOpacity: 1,
      },
      unseenBadge: {
        backgroundColor: '#F80808',
        backgroundOpacity: 1,
        borderRadius: '3px',
        fontFamily: 'Inter',
        fontSize: '10px',
        fontWeight: '400',
        textColor: 'white',
        textAlign: 'center',
        textTransform: 'none',
      },
      container: {
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderColor: 'transparent',
        borderRadius: '8px',
        fontFamily: 'Inter',
        fontSize: '12px',
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.08), 0px 5px 12px rgba(0, 0, 0, 0.16)',
      },
      notification: {
        default: {
          margin: '8px',
          padding: '16px 8px',
          backgroundColor: '#F1ECFD',
          borderRadius: '16px',
          fontFamily: 'Inter',
          fontSize: '12px',
          textColor: 'hsl(215, 14%, 26%)',
          textAlign: 'left',
          textTransform: 'none',
          hover: {
            backgroundColor: '#F1ECFD',
            backgroundOpacity: 1,
          },
          title: {
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 600,
            textColor: '#181B20',
          },
        },
        unread: {
          backgroundColor: '#F8F5FF',
          backgroundOpacity: 1,
          state: {
            color: '#5225C1',
          },
        },
        unseen: {
          backgroundColor: '#F8F5FF',
          backgroundOpacity: 1,
          state: {
            color: '#5225C1',
          },
        },
      },
    },
  },
  outline: {
    name: 'outline',
    background: '#ffffff',
    theme: {
      icon: {
        borderColor: '#5225C1',
        width: '24px',
      },
      header: {
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        borderRadius: '16px',
        borderColor: 'hsl(257, 5%, 90%)',
        fontFamily: 'Inter',
        fontSize: '15px',
        fontWeight: 'normal',
        textColor: '#5225C1',
        textAlign: 'left',
        textTransform: 'none',
      },
      footer: {
        padding: '8px 16px',
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        borderRadius: '8px',
        borderColor: 'hsl(257, 5%, 90%)',
        fontFamily: 'Inter',
        fontSize: '12px',
        textColor: '#5225C1',
        textAlign: 'left',
        textTransform: 'none',
      },
      banner: {
        boxShadow: '0 -1px 0 0 hsl(257deg 5% 90%)',
        backgroundColor: '#F8F5FF',
        backgroundOpacity: 1,
      },
      unseenBadge: {
        backgroundColor: '#F80808',
        backgroundOpacity: 1,
        borderRadius: '3px',
        fontFamily: 'Inter',
        fontSize: '10px',
        fontWeight: '400',
        textColor: 'white',
        textAlign: 'center',
        textTransform: 'none',
      },
      container: {
        backgroundColor: '#FFFFFF',
        backgroundOpacity: 1,
        borderColor: '#5225C1',
        borderRadius: '8px',
        fontFamily: 'Inter',
        fontSize: '12px',
        textAlign: 'left',
        textColor: '#3A424D',
        textTransform: 'none',
        boxShadow: 'none',
      },
      notification: {
        default: {
          margin: '0',
          padding: '16px 8px',
          backgroundColor: '#F1ECFD',
          borderRadius: '0',
          fontFamily: 'Inter',
          fontSize: '12px',
          textColor: 'hsl(215, 14%, 26%)',
          textAlign: 'left',
          textTransform: 'none',
          hover: {
            backgroundColor: '#F1ECFD',
            backgroundOpacity: 1,
          },
          title: {
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 600,
            textColor: '#181B20',
          },
        },
        unread: {
          backgroundColor: '#F8F5FF',
          backgroundOpacity: 1,
        },
        unseen: {
          backgroundColor: '#F8F5FF',
          backgroundOpacity: 1,
        },
      },
    },
  },

  dark: {
    name: 'dark',
    background: '#101318',
    theme: {
      icon: { borderColor: 'white' },
      header: {
        backgroundColor: '#FAD776',
        backgroundOpacity: 0,
        borderRadius: '4px',
        textColor: 'white',
        textTransform: 'none',
      },
      footer: {
        backgroundColor: '#333A40',
        backgroundOpacity: 1,
        borderRadius: '4px',
        textColor: 'white',
      },
      container: { backgroundColor: '#333A40', textColor: 'white' },
      notification: {
        default: {
          backgroundColor: '#333A40',
          backgroundOpacity: 1,
          borderRadius: '4px',
          textColor: 'white',
          title: {
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 600,
            textColor: 'white',
          },
        },
        unread: {
          backgroundColor: '#212328',
          backgroundOpacity: 0.75,
          borderRadius: '4px',
          textColor: 'white',
        },
        unseen: {
          backgroundColor: '#009FF6',
          backgroundOpacity: 0.2,
          borderRadius: '4px',
          textColor: 'white',
        },
      },
    },
  },
};
