/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { INotification, IRemoteNotification, useNotifications } from '@magicbell/react-headless';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ClickableNotification from '../ClickableNotification/index.js';
import Loader from './Loader.js';

type NotificationStore = ReturnType<typeof useNotifications>;

export type NotificationListItem = (props: ListItemProps) => React.ReactElement;
export type ClickCallbackFn = (notification: INotification) => void | boolean;

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
  const style = css`
    height: 100%;

    & .infinite-scroll-component__outerdiv {
      height: 100%;
    }

    & .infinite-scroll-component {
      min-height: 100%;
    }
  `;

  return (
    <div css={style}>
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
    </div>
  );
}
