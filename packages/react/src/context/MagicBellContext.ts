import { createContext, useContext } from 'react';

export interface IMagicBellContext {
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  isFetchingConfig: boolean;
}

const MagicBellContext = createContext<IMagicBellContext>({} as IMagicBellContext);
export default MagicBellContext;

const useMagicBellContext = () => useContext(MagicBellContext);
export { useMagicBellContext };
