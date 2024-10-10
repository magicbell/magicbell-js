/* eslint-disable react/prop-types */
import { CacheProvider } from '@emotion/react';
import type { CustomLocale, IMagicBellTheme } from '@magicbell/magicbell-react';
import MagicBell from '@magicbell/magicbell-react';
import React, { Component, ComponentProps } from 'react';

import { cache } from '../../lib/emotion.js';
import { ReactError } from '../../lib/error/index.js';
import { pkg } from '../../lib/pkg.js';
import FloatingFrame from '../FloatingFrame/index.js';
import { FrameContentProps } from '../FrameContent/index.js';

type MagicBellProps = ComponentProps<typeof MagicBell>;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

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
  theme?: DeepPartial<IMagicBellTheme>;
  onNewNotification?: MagicBellProps['onNewNotification'];
  defaultIsOpen?: boolean;
  stores?: MagicBellProps['stores'];
}

const internals = {
  appInfo: {
    name: pkg.name,
    version: pkg.version,
  },
};

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
          // provide private props like this, so it's not part of the public api
          {...internals}
        >
          {(props) => <FloatingFrame {...inboxProps} {...props} />}
        </MagicBell>
      </CacheProvider>
    );
  }
}
