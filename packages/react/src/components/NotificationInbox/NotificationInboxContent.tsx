/* @jsx jsx */
import { jsx } from '@emotion/react';
import { NotificationStore } from '@magicbell/react-headless/dist/hooks/useNotifications';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useState } from 'react';

import { useHeight } from '../../lib/window';
import NotificationList from '../NotificationList';
import { NotificationListItem } from '../NotificationList/NotificationList';

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
  // we use a refSetter so that the height observer is reattached on a ref change
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const contentHeight = useHeight(contentRef, height);

  return (
    <div ref={setContentRef} css={{ width: '100%', height: height ?? '100%' }}>
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
