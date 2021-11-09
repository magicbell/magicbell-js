import IRemoteNotification from './IRemoteNotification';

export type IStrategyComparator = (attribute, rule) => boolean;

export default interface INotificationStore {
  context: Object;
  total: number;
  totalPages: number;
  perPage: number;
  currentPage: number;
  unreadCount: number;
  unseenCount: number;
  notifications: IRemoteNotification[];
  lastFetchedAt?: Date;

  /**
   * Test whether a notification belongs to this store or not, based on the
   * context.
   *
   * @param notification Notification to text
   * @param comparator Function to test the notification against the context
   * @returns Whether the notification belongs to this store or not
   */
  notificationMatchesContext(notification: IRemoteNotification, comparator?: IStrategyComparator): boolean;
}
