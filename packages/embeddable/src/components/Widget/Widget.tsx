/* eslint-disable react/prop-types */
import MagicBell from '@magicbell/magicbell-react';
import { IMagicBellTheme } from '@magicbell/magicbell-react/dist/types/context/Theme';
import { CustomLocale } from '@magicbell/magicbell-react/dist/types/lib/i18n';
import { DeepPartial } from '@magicbell/magicbell-react/dist/types/lib/types';
import React from 'react';
import FloatingFrame from '../FloatingFrame';
import { FrameContentProps } from '../FrameContent';

export interface WidgetProps extends FrameContentProps {
  apiKey: string;
  userEmail: string;
  userKey?: string;
  locale?: string | CustomLocale;
  _baseURL?: string;
  stylesheets?: string[];
  theme: DeepPartial<IMagicBellTheme>;
}

/**
 * Component to render MagicBell within an iframe.
 *
 * @example
 * <Widget
 *   apiKey="API_KEY"
 *   userEmail="USER_EMAIL"
 *   onAllRead={notify}
 *   onNotificationClick={navigate} />
 */
export default function Widget({ apiKey, userEmail, userKey, theme, locale, _baseURL, ...inboxProps }: WidgetProps) {
  return (
    <MagicBell
      apiKey={apiKey}
      userEmail={userEmail}
      userKey={userKey}
      theme={theme}
      locale={locale}
      _baseURL={_baseURL}
    >
      {(props) => <FloatingFrame {...inboxProps} {...props} />}
    </MagicBell>
  );
}
