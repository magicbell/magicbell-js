/** @jsx jsx */
import { jsx } from '@emotion/react';
import { NotificationStore } from '@magicbell/react-headless/dist/hooks/useNotifications';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useEffect, useRef, useState } from 'react';
import { useHeight } from '../../lib/window';
import NotificationList from '../NotificationList';
import { NotificationListItem } from '../NotificationList/NotificationList';
import ClearInboxMessage from './ClearInboxMessage';

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
  height,
  onNotificationClick,
  store,
  NotificationItem,
}: NotificationInboxContentProps) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerHeight = useHeight(ref, height);
  const [listHeight, setListHeight] = useState(height);

  useEffect(() => {
    setListHeight(containerHeight);
  }, [containerHeight]);

  return (
    <div ref={ref} css={{ flex: 1, overflowY: 'hidden' }}>
      {store.lastFetchedAt && store.isEmpty && <ClearInboxMessage />}
      {store.lastFetchedAt && !store.isEmpty && (
        <NotificationList
          height={listHeight}
          notifications={store}
          onItemClick={onNotificationClick}
          queryParams={store.context}
          ListItem={NotificationItem}
        />
      )}
    </div>
  );
}
