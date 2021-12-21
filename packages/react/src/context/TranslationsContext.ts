import pathOr from 'ramda/src/pathOr';
import { createContext, useCallback, useContext } from 'react';

const TranslationsContext = createContext<any>({});
export default TranslationsContext;

export const TranslationsProvider = TranslationsContext.Provider;
export const useTranslations = () => useContext(TranslationsContext);

export function useTranslate() {
  const translations = useTranslations();

  return useCallback(
    (id: string, defaultMessage?: string) => pathOr(defaultMessage, id.split('.'), translations),
    [translations],
  );
}
