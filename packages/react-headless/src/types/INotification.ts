import { Dayjs } from '../lib/date';
import IRemoteNotification from './IRemoteNotification';

export default interface INotification
  extends Omit<IRemoteNotification, 'readAt' | 'seenAt' | 'sentAt' | 'archivedAt'> {
  readAt: Dayjs | null;
  seenAt: Dayjs | null;
  sentAt: Dayjs | null;
  archivedAt: Dayjs | null;
  isSeen: boolean;
  isRead: boolean;
  isArchived: boolean;
  sanitizedContent: string | null;

  /**
   * Mark the notification as seen. Sets its `seenAt` attribute.
   */
  markAsSeen: () => void;

  /**
   * Mark the notification as read. Sets its `readAt` attribute and makes a
   * request to the server.
   */
  markAsRead: () => Promise<boolean>;

  /**
   * Mark the notification as unread. Unsets its `readAt` attribute and makes a
   * request to the server.
   */
  markAsUnread: () => Promise<boolean>;

  /**
   * Permanentely delete the notification.
   */
  delete: () => Promise<boolean>;
}
