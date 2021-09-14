import { NotificationStore } from '@magicbell/react-headless/dist/hooks/useNotifications';
import IRemoteNotification from '@magicbell/react-headless/dist/types/IRemoteNotification';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClickableNotification from '../ClickableNotification';
import Loader from './Loader';

export type NotificationListItem = (props: ListItemProps) => React.ReactElement;
export type ClickCallbackFn = (notification: Notification) => void;

export interface ListItemProps {
  notification: IRemoteNotification;
  onClick?: ClickCallbackFn;
}

export interface NotificationListProps {
  onItemClick?: ClickCallbackFn;
  height?: number | string;
  ListItem?: (props: ListItemProps) => React.ReactElement;
  notifications: NotificationStore;
  queryParams?;
  scrollableTarget?: React.ReactNode;
}

/**
 * Infinite scroll list of notifications. Fetches the next page of the
 * notifications store when the user scrolls to the bottom of the list.
 *
 * @example
 * <NotificationList
 *   notifications={new NotificationStore()}
 *   queryParams={{ read: false }}
 *   onItemClick={openNotification}
 *   ListItem={Notification} />
 */
export default function NotificationList({
  notifications: store,
  onItemClick,
  height,
  queryParams,
  scrollableTarget,
  ListItem = ClickableNotification,
}: NotificationListProps) {
  return (
    <InfiniteScroll
      dataLength={store.notifications.length}
      hasMore={store.hasNextPage}
      next={() => store.fetchNextPage(queryParams)}
      loader={<Loader />}
      height={height}
      scrollableTarget={scrollableTarget}
    >
      {store.notifications.map((notification) => (
        <ListItem key={notification.id} notification={notification} onClick={onItemClick} />
      ))}
    </InfiniteScroll>
  );
}
