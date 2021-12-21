import { createContext } from 'react';

export const NO_PROVIDER = 'MAGICBELL_NO_PROVIDER';

const CurrentProviderContext = createContext<string>(NO_PROVIDER);
export default CurrentProviderContext;
