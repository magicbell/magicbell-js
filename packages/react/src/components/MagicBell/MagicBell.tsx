import { useMagicBellEvent } from '@magicbell/react-headless';
import INotificationStore from '@magicbell/react-headless/dist/types/INotificationStore';
import IRemoteNotification from '@magicbell/react-headless/dist/types/IRemoteNotification';
import React, { useRef } from 'react';
import useToggle from 'react-use/lib/useToggle';

import { IMagicBellTheme } from '../../context/Theme';
import { CustomLocale } from '../../lib/i18n';
import { DeepPartial } from '../../lib/types';
import Bell from '../Bell';
import FloatingNotificationInbox from '../FloatingNotificationInbox';
import MagicBellChildrenWrapper from '../MagicBellProvider/MagicBellChildrenWrapper';

type StoreConfig = {
  id: string;
  defaultQueryParams: Record<string, unknown>;
  defaults?: Partial<Omit<INotificationStore, 'context'>>;
};

export interface Props {
  apiKey?: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  children?: (params: {
    launcherRef: React.RefObject<Element>;
    isOpen: boolean;
    toggle: () => void;
  }) => JSX.Element;
  theme?: DeepPartial<IMagicBellTheme>;
  BellIcon?: JSX.Element;
  Badge?: (props: { count: number }) => JSX.Element;
  defaultIsOpen?: boolean;
  stores?: StoreConfig[];
  locale?: string | CustomLocale;
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  serverURL?: string;
  disableRealtime?: boolean;
  onNewNotification?: (notification: IRemoteNotification) => void;
  onToggle?: (isOpen: boolean) => void;
  bellCounter?: 'unread' | 'unseen';
}

const defaultInbox = (props) => <FloatingNotificationInbox height={500} {...props} />;

/**
 * Magicbell root component. Use this one in your application.
 *
 * @param props.apiKey API key of the MagicBell project
 * @param props.userEmail Email of the user whose notifications will be displayed
 * @param props.userExternalId External ID of the user whose notifications will be displayed
 * @param props.userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
 * @param props.theme Object to customize the theme
 * @param props.BellIcon Icon for the bell
 * @param props.Badge A custom badge component to show the number of unread or unseen notifications
 * @param props.defaultIsOpen Show the children when the component is rendered. It is false by default.
 * @param props.stores Configuration of stores to be created
 * @param props.locale Locale to use in the components
 * @param props.onNewNotification Function called when a notification is created.
 * @param props.onToggle Function called when the bell is clicked.
 * @param props.bellCounter Counter to show in the bell. If set to 'unread' it will show the number of unread notifications.
 *
 * @example
 * <MagicBell
 *   apiKey={MAGICBELL_API_KEY}
 *   userEmail={email}
 *   BellIcon={<MyIcon />}
 * >
 *   {(props) => <NotificationInbox {...props} />}
 * </MagicBell>
 */
export default function MagicBell({
  children = defaultInbox,
  BellIcon,
  Badge,
  defaultIsOpen = false,
  onNewNotification,
  onToggle,
  bellCounter = 'unseen',
  ...settings
}: Props) {
  const launcherRef = useRef(null);
  const [isOpen, toggleChildren] = useToggle(defaultIsOpen);

  const handleToggle = () => {
    toggleChildren();
    onToggle?.(isOpen);
  };

  const handleNewNotification = (notification: IRemoteNotification) => {
    onNewNotification?.(notification);
  };

  useMagicBellEvent('notifications.new', handleNewNotification);

  return (
    <MagicBellChildrenWrapper {...settings}>
      <div>
        <div ref={launcherRef} aria-expanded={isOpen}>
          <Bell onClick={handleToggle} Icon={BellIcon} Badge={Badge} counter={bellCounter} />
        </div>
        {isOpen && children({ isOpen, toggle: handleToggle, launcherRef })}
      </div>
    </MagicBellChildrenWrapper>
  );
}
