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
};
