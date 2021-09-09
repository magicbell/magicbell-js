import IRemoteNotification from './IRemoteNotification';

export default interface INotificationsStore {
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
