/* eslint-disable react/prop-types */
import { CacheProvider } from '@emotion/core';
import MagicBell, { Notification } from '@magicbell/magicbell-react';
import { IMagicBellTheme } from '@magicbell/magicbell-react/dist/context/Theme';
import { CustomLocale } from '@magicbell/magicbell-react/dist/lib/i18n';
import { DeepPartial } from '@magicbell/magicbell-react/dist/lib/types';
import React, { Component } from 'react';
import { cache } from '../../lib/emotion';
import { ReactError } from '../../lib/error';
import FloatingFrame from '../FloatingFrame';
import { FrameContentProps } from '../FrameContent';

export interface WidgetProps extends FrameContentProps {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  locale?: string | CustomLocale;
  _baseURL?: string;
  stylesheets?: string[];
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  theme: DeepPartial<IMagicBellTheme>;
  onNewNotification?: (notification: Notification) => void;
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
export default class Widget extends Component<WidgetProps> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    const { userEmail, userExternalId } = this.props;
    const userId = (userEmail || userExternalId) as string;
    const person = { id: userId };

    new ReactError(error, info, person, this.props).report();
  }

  render() {
    const {
      apiKey,
      userEmail,
      userExternalId,
      userKey,
      theme,
      locale,
      _baseURL,
      images,
      onNewNotification,
      ...inboxProps
    } = this.props;

    return (
      <CacheProvider value={cache}>
        <MagicBell
          apiKey={apiKey}
          userEmail={userEmail}
          userExternalId={userExternalId}
          userKey={userKey}
          theme={theme}
          locale={locale}
          images={images}
          onNewNotification={onNewNotification}
          _baseURL={_baseURL}
        >
          {(props) => <FloatingFrame {...inboxProps} {...props} />}
        </MagicBell>
      </CacheProvider>
    );
  }
}
