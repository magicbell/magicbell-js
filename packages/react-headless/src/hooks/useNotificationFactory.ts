import isNil from 'ramda/src/isNil';

import { secondsToDate } from '../lib/date';
import { parseJSON } from '../lib/json';
import { useNotificationStoresCollection } from '../stores/notifications';
import INotification from '../types/INotification';
import IRemoteNotification from '../types/IRemoteNotification';

/**
 * Hook that builds a notification object.
 *
 * @param data Notification data.
 */
export default function useNotificationFactory(data: IRemoteNotification): INotification {
  const { markNotificationAsRead, markNotificationAsSeen, markNotificationAsUnread, deleteNotification } =
    useNotificationStoresCollection();

  const markAsSeen = () => markNotificationAsSeen(data);
  const markAsRead = () => markNotificationAsRead(data);
  const markAsUnread = () => markNotificationAsUnread(data);
  const deleteSelf = () => deleteNotification(data);

  return {
    ...data,
    customAttributes: parseJSON(data.customAttributes),
    readAt: secondsToDate(data.readAt),
    seenAt: secondsToDate(data.seenAt),
    sentAt: secondsToDate(data.sentAt),
    archivedAt: secondsToDate(data.archivedAt),
    isSeen: !isNil(data.seenAt),
    isRead: !isNil(data.readAt),
    isArchived: !isNil(data.archivedAt),
    sanitizedContent: data.content,
    markAsSeen,
    markAsRead,
    markAsUnread,
    delete: deleteSelf,
  };
}
