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
}
