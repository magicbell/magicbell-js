import { INotification } from '@magicbell/react-headless';
import React, { ComponentProps, Dispatch, SetStateAction, useState } from 'react';

import { useMagicBellContext } from '../../context/MagicBellContext.js';
import { NotificationListItem } from '../NotificationList/NotificationList.js';
import Layout from './Layout.js';
import NotificationsView, { NotificationsViewProps } from './private/NotificationsView.js';
import PreferencesView from './private/PreferencesView.js';
import StyledContainer from './StyledContainer.js';

export type NotificationInboxProps = {
  height?: number;
  onAllRead?: () => void;
  onNotificationClick?: (notification: INotification) => void | boolean;
  storeId?: string;
  EmptyInboxPlaceholder?: () => React.ReactElement;
  NotificationItem?: NotificationListItem;
  NotificationPreferences?: () => React.ReactElement;
  notificationPreferencesEnabled?: boolean;
  layout?: ComponentProps<typeof Layout>['order'];
  tabs?: NotificationsViewProps['tabs'];
};

export type SetViewHandler = Dispatch<SetStateAction<'inbox' | 'preferences'>>;

/**
 * Component that renders all notifications as well as a header and a footer.
 *
 * @example
 * <NotificationInbox
 *   storeId="unread"
 *   onNotificationClick={openTicket}
 *   onAllRead={showAlert} />
 */
export default function NotificationInbox({
  height,
  layout = ['header', 'content', 'push-notifications-banner', 'footer'],
  tabs,
  ...props
}: NotificationInboxProps) {
  const [view, setView] = useState<'inbox' | 'preferences'>('inbox');
  const { isFetchingConfig } = useMagicBellContext();
  if (isFetchingConfig) return null;

  return (
    <StyledContainer height={height} layout={layout}>
      {view === 'preferences' ? (
        <PreferencesView {...props} layout={layout} setView={setView} />
      ) : (
        <NotificationsView {...props} tabs={tabs} layout={layout} setView={setView} />
      )}
    </StyledContainer>
  );
}
