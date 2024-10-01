import { isNil } from 'ramda';

import { secondsToDate } from '../lib/date.js';
import { parseJSON } from '../lib/json.js';
import { useNotificationStoresCollection } from '../stores/notifications/index.js';
import INotification from '../types/INotification.js';
import IRemoteNotification from '../types/IRemoteNotification.js';

/**
 * Hook that builds a notification object.
 *
 * @param data Notification data.
 */
export default function useNotificationFactory(data: IRemoteNotification): INotification {
  const {
    markNotificationAsRead,
    markNotificationAsSeen,
    markNotificationAsUnread,
    deleteNotification,
    archiveNotification,
    unarchiveNotification,
  } = useNotificationStoresCollection();

  const markAsSeen = () => markNotificationAsSeen(data);
  const markAsRead = () => markNotificationAsRead(data);
  const markAsUnread = () => markNotificationAsUnread(data);
  const deleteSelf = () => deleteNotification(data);
  const archive = () => archiveNotification(data);
  const unarchive = () => unarchiveNotification(data);

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
    archive,
    unarchive,
  };
}
