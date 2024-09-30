/** @jsxImportSource @emotion/react */
import { INotification, useNotifications } from '@magicbell/react-headless';
import { useState } from 'react';

import NotificationList from '../NotificationList/index.js';
import { NotificationListItem } from '../NotificationList/NotificationList.js';

type NotificationStore = ReturnType<typeof useNotifications>;

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
  const [contentRef, setContentRef] = useState<any>(null);

  return (
    <div ref={setContentRef} css={{ width: '100%', height: height ?? '100%', overflow: 'auto' }}>
      {contentRef ? (
        <NotificationList
          scrollableTarget={contentRef}
          notifications={store}
          onItemClick={onNotificationClick}
          queryParams={store.context}
          ListItem={NotificationItem}
        />
      ) : null}
    </div>
  );
}
