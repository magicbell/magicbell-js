/* eslint-disable react/prop-types */
import { CacheProvider } from '@emotion/react';
import MagicBell from '@magicbell/magicbell-react';
import { IMagicBellTheme } from '@magicbell/magicbell-react/dist/context/Theme';
import { CustomLocale } from '@magicbell/magicbell-react/dist/lib/i18n';
import { DeepPartial } from '@magicbell/magicbell-react/dist/lib/types';
import React, { Component, ComponentProps } from 'react';
import { cache } from '../../lib/emotion';
import { ReactError } from '../../lib/error';
import FloatingFrame from '../FloatingFrame';
import { FrameContentProps } from '../FrameContent';

type MagicBellProps = ComponentProps<typeof MagicBell>;

export interface WidgetProps extends FrameContentProps {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  locale?: string | CustomLocale;
  serverURL?: string;
  stylesheets?: string[];
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  theme: DeepPartial<IMagicBellTheme>;
  onNewNotification?: MagicBellProps['onNewNotification'];
  defaultIsOpen?: boolean;
  stores: MagicBellProps['stores'];
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
      serverURL,
      images,
      onNewNotification,
      defaultIsOpen,
      stores,
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
          serverURL={serverURL}
          defaultIsOpen={defaultIsOpen}
          stores={stores}
          onNewNotification={onNewNotification}
        >
          {(props) => <FloatingFrame {...inboxProps} {...props} />}
        </MagicBell>
      </CacheProvider>
    );
  }
}
