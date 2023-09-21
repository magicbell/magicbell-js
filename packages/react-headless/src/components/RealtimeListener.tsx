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
  const settings = clientSettings.getState();
  const client = settings.getClient();
  const apiKey = settings.apiKey;
  const user = settings.userExternalId || settings.userEmail;

  const fetchAndResetAll = () => collection.fetchAllStores({ page: 1 }, { reset: true });
  const fetchAndPrependAll = () => collection.fetchAllStores({ page: 1 }, { prepend: true });
  const markAllAsSeen = () => collection.markAllAsSeen({ persist: false });
  const markAllAsRead = () => collection.markAllAsRead({ persist: false });
  const removeNotification = (data: IRemoteNotification) => collection.deleteNotification(data, { persist: false });

  useEffect(() => {
    if (!apiKey || !user) return;
    const listen = client.listen();

    listen.forEach((event) => {
      void handleAblyEvent(event);
    });

    return () => listen.close();
  }, [client, apiKey, user]);

  useMagicBellEvent('reconnected', fetchAndResetAll);
  useMagicBellEvent('notifications.new', fetchAndPrependAll, { source: 'remote' });
  useMagicBellEvent('notifications.seen.all', markAllAsSeen, { source: 'remote' });
  useMagicBellEvent('notifications.read.all', markAllAsRead, { source: 'remote' });
  useMagicBellEvent('notifications.read', fetchAndResetAll, { source: 'remote' });
  useMagicBellEvent('notifications.unread', fetchAndResetAll, { source: 'remote' });
  useMagicBellEvent('notifications.delete', removeNotification, { source: 'remote' });

  return null;
}
