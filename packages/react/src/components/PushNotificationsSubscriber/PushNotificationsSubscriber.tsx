import { useConfig } from '@magicbell/react-headless';
import { useEffect } from 'react';
import { createPushSubscription, createSafariPushSubscription } from '../../lib/push';

export interface Props {
  children: (params: {
    createSubscription: () => Promise<any>;
    isPushAPISupported: boolean;
  }) => JSX.Element;
  serviceWorkerPath?: string;
  skipServiceWorkerRegistration?: boolean;
}

/**
 * Headless component to create subscriptions to push notifications for the
 * current user.
 *
 * @example
 * <PushNotificationsSubscriber>
 *   {({ createSubscription }) =>
 *     <button onClick={createSubscription}>Subscribe</button>}
 * <PushNotificationsSubscriber>
 */
export default function PushNotificationsSubscriber({
  children,
  serviceWorkerPath = '/service-worker.js',
  skipServiceWorkerRegistration = false,
}: Props) {
  const config = useConfig();
  const isSafari = 'safari' in window;
  const isPushAPISupported = 'PushManager' in window;

  useEffect(() => {
    if (!skipServiceWorkerRegistration) navigator.serviceWorker.register(serviceWorkerPath);
  }, []);

  const createSubscription = async () => {
    if (!config) return Promise.reject(new Error('Context for MagicBell was not found'));

    if (isSafari) return createSafariPushSubscription();
    if (isPushAPISupported) {
      return navigator.serviceWorker.ready.then(async (registration) => {
        await createPushSubscription(registration.pushManager, config);
      });
    }
  };

  return children({ createSubscription, isPushAPISupported });
}
