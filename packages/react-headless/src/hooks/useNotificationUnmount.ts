import { useEffect } from 'react';

import INotification from '../types/INotification';

/**
 * Hook that is ran when the component is unmounted. By default marks a
 * notification as seen.
 *
 * @param notification The notification
 * @param fn Callback function to execute when the component is unmounted
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
    // TODO: Update code to follow lint suggestions of add missing dependencies,
    // remove [] or wrap parent component in callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
