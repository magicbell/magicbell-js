/* @jsx jsx */
import { jsx } from '@emotion/react';
import { NotificationStore } from '@magicbell/react-headless/dist/hooks/useNotifications';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import NotificationList from '../NotificationList';
import { NotificationListItem } from '../NotificationList/NotificationList';
import ClearInboxMessage from './ClearInboxMessage';
import { useRef } from 'react';
import { useHeight } from '../../lib/window';

export interface NotificationInboxContentProps {
  height?: number;
  onNotificationClick?: (notification: INotification) => void;
  store: NotificationStore;
  NotificationItem?: NotificationListItem;
}

/**
 * Component that renders an infinite scroll list of notifications, or error
 * messages if the list can't be fetched.
 *
 * @example
 * <NotificationInboxContent
 *   store={notifications}
 *   onNotificationClick={openTicket}
 *   height={500} />
 */
export default function NotificationInboxContent({
  onNotificationClick,
  store,
  height,
  NotificationItem,
}: NotificationInboxContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = useHeight(contentRef, height);

  if (!store.lastFetchedAt) return null;
  if (store.isEmpty) return <ClearInboxMessage />;

  return (
    <div ref={contentRef} css={{ width: '100%', height: height ?? '100%' }}>
      <NotificationList
        height={contentHeight}
        notifications={store}
        onItemClick={onNotificationClick}
        queryParams={store.context}
        ListItem={NotificationItem}
      />
    </div>
  );
}
