import { pathOr } from 'ramda';
import React from 'react';

import { useTranslations } from '../../context/TranslationsContext.js';

type TextProps = {
  id: string;
  defaultMessage: string;
  html?: boolean;
};

/**
 *
 * @example
 * <Text id="header.title" defaultMessage="My Notifications" />
 */
export default function Text({ id, defaultMessage, html = false }: TextProps) {
  const translations = useTranslations();
  const localizedText = pathOr(defaultMessage, id.split('.'), translations);

  if (html) return <span dangerouslySetInnerHTML={{ __html: localizedText }} />;
  return <>{localizedText}</>;
}
