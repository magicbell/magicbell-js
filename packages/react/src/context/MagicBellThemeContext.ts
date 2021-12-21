import { createContext, useContext } from 'react';

import { defaultTheme, IMagicBellTheme } from './Theme';

const MagicBellThemeContext = createContext<IMagicBellTheme>(defaultTheme);
export default MagicBellThemeContext;

const MagicBellThemeProvider = MagicBellThemeContext.Provider;
const useTheme = () => useContext(MagicBellThemeContext);
export { MagicBellThemeProvider, useTheme };
