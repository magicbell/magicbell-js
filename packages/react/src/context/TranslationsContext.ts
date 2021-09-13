import { createContext, useContext } from 'react';

const TranslationsContext = createContext<any>({});
export default TranslationsContext;

const TranslationsProvider = TranslationsContext.Provider;
const useTranslations = () => useContext(TranslationsContext);
export { TranslationsProvider, useTranslations };
