import { useEffect } from 'react';

import useMagicBellEvent from '../hooks/useMagicBellEvent';
import { handleAblyEvent } from '../lib/realtime';
import clientSettings from '../stores/clientSettings';
import { useNotificationStoresCollection } from '../stores/notifications';
import IRemoteNotification from '../types/IRemoteNotification';

/**
 * Component that setups a listener to realtime events and keeps notifications
 * stores up to date.
 *
 * @example <RealtimeListener />
 */
export default function RealtimeListener() {
  const collection = useNotificationStoresCollection();
  const client = clientSettings.getState().getClient();

  const fetchAndResetAll = () => collection.fetchAllStores({ page: 1 }, { reset: true });
  const fetchAndPrependAll = () => collection.fetchAllStores({ page: 1 }, { prepend: true });
  const markAllAsSeen = () => collection.markAllAsSeen({ persist: false });
  const markAllAsRead = () => collection.markAllAsRead({ persist: false });
  const removeNotification = (data: IRemoteNotification) => collection.deleteNotification(data, { persist: false });

  useEffect(() => {
    // MSW doesn't seem to catch the requests made to Ably, so we skip this
    // for the time being.
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') return;

    const listen = client.listen();

    listen.forEach((event) => {
      void handleAblyEvent(event);
    });

    return () => listen.close();
  }, [client]);

  useMagicBellEvent('reconnected', fetchAndResetAll);
  useMagicBellEvent('notifications.new', fetchAndPrependAll, { source: 'remote' });
  useMagicBellEvent('notifications.seen.all', markAllAsSeen, { source: 'remote' });
  useMagicBellEvent('notifications.read.all', markAllAsRead, { source: 'remote' });
  useMagicBellEvent('notifications.read', fetchAndResetAll, { source: 'remote' });
  useMagicBellEvent('notifications.unread', fetchAndResetAll, { source: 'remote' });
  useMagicBellEvent('notifications.delete', removeNotification, { source: 'remote' });

  return null;
}
