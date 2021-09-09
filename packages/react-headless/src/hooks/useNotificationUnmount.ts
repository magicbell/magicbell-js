import { useEffect } from 'react';
import INotification from '../types/INotification';

/**
 * Hook that is ran when the component is unmounted. By default marks a
 * notification as seen.
 *
 * @example
 * useNotificationUnmount(notification);
 */
export default function useNotificationUnmount(
  notification: INotification,
  fn?: (notification: INotification) => void,
) {
  useEffect(() => {
    return () => {
      if (fn) fn(notification);
      else notification.markAsSeen();
    };
  }, []);
}
