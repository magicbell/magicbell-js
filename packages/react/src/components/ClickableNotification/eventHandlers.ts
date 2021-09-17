import INotification from '@magicbell/react-headless/dist/types/INotification';

/**
 * Function that opens the `actionUrl` of a notification in the same window.
 *
 * @param notification The notification
 */
export function openActionUrl(notification: INotification) {
  if (notification.actionUrl) window.open(notification.actionUrl, '_self');
}
