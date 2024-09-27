import INotification from '../types/INotification.js';
import IRemoteNotification from '../types/IRemoteNotification.js';
import useNotificationFactory from './useNotificationFactory.js';
import useNotificationUnmount from './useNotificationUnmount.js';

export default function useNotification(
  data: IRemoteNotification,
  onUnmount?: (notification: INotification) => void,
): INotification {
  const notification = useNotificationFactory(data);
  useNotificationUnmount(notification, onUnmount);

  return notification;
}
