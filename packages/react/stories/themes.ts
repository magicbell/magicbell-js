import { IMagicBellTheme } from '../src';
import { DeepPartial } from '../src/lib/types';
import { classicTheme } from '../src/themes/classic';
import { flatTheme } from '../src/themes/flat';
import { lightTheme } from '../src/themes/light';

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
    theme: {},
  },
  light: {
    name: 'light',
    background: '#ffffff',
    theme: lightTheme,
  },
  flat: {
    name: 'flat',
    background: '#ffffff',
    theme: flatTheme,
  },
  classic: {
    name: 'classic',
    background: '#ffffff',
    theme: classicTheme,
  },
  custom: {
    name: 'custom',
    background: '#ffffff',
    theme: {
      // A theme copied from the dashboard
      icon: { borderColor: '#13AFAF', width: '24px' },
      unseenBadge: { backgroundColor: '#3890E9' },
      header: { backgroundColor: '#EC5252', textColor: '#ffffff', borderRadius: '2px' },
      footer: { backgroundColor: '#EC5252', textColor: '#ffffff', borderRadius: '2px' },
      notification: {
        default: { textColor: '#3890E9', borderRadius: '2px', backgroundColor: '#EC5252' },
        unseen: { backgroundColor: '#EC5252', textColor: '#3890E9', borderRadius: '2px' },
        unread: { backgroundColor: '#EC5252', textColor: '#3890E9', borderRadius: '2px' },
      },
    },
  },
};
