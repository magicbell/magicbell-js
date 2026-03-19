import { useEffect, useRef } from 'react';

import useMagicBellEvent from '../hooks/useMagicBellEvent.js';
import { emitEvent, handleSocketEvent } from '../lib/realtime.js';
import clientSettings from '../stores/clientSettings.js';
import { useNotificationStoresCollection } from '../stores/notifications/index.js';
import IRemoteNotification from '../types/IRemoteNotification.js';

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
  const listenerRef = useRef<ReturnType<typeof client.listen> | null>(null);
  const lastRefreshAt = useRef(0);
  const refreshIntervalMs = 15000;

  const fetchAndResetAll = () => collection.fetchAllStores({ page: 1 }, { reset: true });
  const fetchAndPrependAll = () => collection.fetchAllStores({ page: 1 }, { prepend: true });
  const markAllAsSeen = () => collection.markAllAsSeen({ persist: false });
  const markAllAsRead = () => collection.markAllAsRead({ persist: false });
  const removeNotification = (data: IRemoteNotification) => collection.deleteNotification(data, { persist: false });
  const archiveNotification = (data: IRemoteNotification) => collection.archiveNotification(data, { persist: false });
  const unarchiveNotification = (data: IRemoteNotification) =>
    collection.unarchiveNotification(data, { persist: false });

  useEffect(() => {
    if (!apiKey || !user) return;
    if (typeof document === 'undefined') return;
    const startListening = () => {
      if (!apiKey || !user) return;
      if (document.hidden) return;
      if (listenerRef.current) return;

      const listen = client.listen();
      listenerRef.current = listen;

      void listen
        .forEach((event) => {
          if (!event) return;
          void handleSocketEvent(event);
        })
        .finally(() => {
          if (listenerRef.current === listen) {
            listenerRef.current = null;
          }
        });
    };

    const stopListening = () => {
      listenerRef.current?.close();
      listenerRef.current = null;
    };

    const shouldRefresh = () => {
      const now = Date.now();
      if (now - lastRefreshAt.current < refreshIntervalMs) return false;
      lastRefreshAt.current = now;
      return true;
    };

    const handleFocus = () => {
      if (document.hidden) return;
      if (!shouldRefresh()) return;
      void fetchAndPrependAll();
    };

    const enableFocusListener = () => {
      window.addEventListener('focus', handleFocus);
    };

    const disableFocusListener = () => {
      window.removeEventListener('focus', handleFocus);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopListening();
        disableFocusListener();
        return;
      }

      startListening();
      void fetchAndResetAll();
      emitEvent('reconnected', null, 'local');
      enableFocusListener();
    };

    startListening();

    if (!document.hidden) {
      enableFocusListener();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      disableFocusListener();
      stopListening();
    };
  }, [client, apiKey, user]);

  useMagicBellEvent('reconnected', fetchAndResetAll);
  useMagicBellEvent('notifications.new', fetchAndPrependAll, { source: 'remote' });
  useMagicBellEvent('notifications.seen.all', markAllAsSeen, { source: 'remote' });
  useMagicBellEvent('notifications.read.all', markAllAsRead, { source: 'remote' });
  useMagicBellEvent('notifications.read', fetchAndResetAll, { source: 'remote' });
  useMagicBellEvent('notifications.unread', fetchAndResetAll, { source: 'remote' });
  useMagicBellEvent('notifications.delete', removeNotification, { source: 'remote' });
  useMagicBellEvent('notifications.archived', archiveNotification, { source: 'remote' });
  useMagicBellEvent('notifications.unarchived', unarchiveNotification, { source: 'remote' });
  return null;
}
