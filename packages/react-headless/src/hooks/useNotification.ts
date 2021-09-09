import INotification from '../types/INotification';
import IRemoteNotification from '../types/IRemoteNotification';
import useNotificationFactory from './useNotificationFactory';
import useNotificationUnmount from './useNotificationUnmount';

export default function useNotification(
  data: IRemoteNotification,
  onUnmount?: (notification: INotification) => void,
): INotification {
  const notification = useNotificationFactory(data);
  useNotificationUnmount(notification, onUnmount);

  return notification;
}
