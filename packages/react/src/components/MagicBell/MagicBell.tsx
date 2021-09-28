import { useMagicBellEvent } from '@magicbell/react-headless';
import INotificationStore from '@magicbell/react-headless/dist/types/INotificationStore';
import IRemoteNotification from '@magicbell/react-headless/dist/types/IRemoteNotification';
import React, { useRef } from 'react';
import useToggle from 'react-use/lib/useToggle';
import { IMagicBellTheme } from '../../context/Theme';
import { CustomLocale } from '../../lib/i18n';
import { DeepPartial } from '../../lib/types';
import Bell from '../Bell';
import MagicBellProvider from '../MagicBellProvider';

type StoreConfig = {
  id: string;
  defaultQueryParams: Object;
  defaults?: Partial<Omit<INotificationStore, 'context'>>;
};

export interface Props {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  children: (params: {
    launcherRef: React.RefObject<Element>;
    isOpen: boolean;
    toggle: () => void;
  }) => JSX.Element;
  theme?: DeepPartial<IMagicBellTheme>;
  BellIcon?: JSX.Element;
  defaultIsOpen?: boolean;
  stores?: StoreConfig[];
  locale?: string | CustomLocale;
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  serverURL?: string;
  onNewNotification?: (notification: IRemoteNotification) => void;
  onToggle?: (isOpen: boolean) => void;
  bellCounter?: 'unread' | 'unseen';
}

/**
 * Magicbell root component. Use this one in your application.
 *
 * @param apiKey API key of the MagicBell project
 * @param userEmail Email of the user whose notifications will be displayed
 * @param userExternalId External ID of the user whose notifications will be displayed
 * @param userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
 * @param theme Object to customize the theme
 * @param BellIcon Icon for the bell
 * @param defaultIsOpen Show the children when the component is rendered. It is false by default.
 * @param stores Configuration of stores to be created
 * @param locale Locale to use in the components
 * @param onNewNotification Function called when a notification is created.
 * @param onToggle Function called when the bell is clicked.
 * @param bellCounter Counter to show in the bell. If set to 'unread' it will show the number of unread notifications.
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
  children,
  BellIcon,
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
    <MagicBellProvider {...settings}>
      <div>
        <div ref={launcherRef} aria-expanded={isOpen}>
          <Bell onClick={handleToggle} Icon={BellIcon} counter={bellCounter} />
        </div>
        {isOpen && children({ isOpen, toggle: handleToggle, launcherRef })}
      </div>
    </MagicBellProvider>
  );
}
