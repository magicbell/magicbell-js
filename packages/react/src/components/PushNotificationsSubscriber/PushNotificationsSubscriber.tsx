import { useConfig } from '@magicbell/react-headless';
import { path } from 'ramda';
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

    if (isSafari) {
      const authenticationToken = path(
        ['safari', 'authenticationToken'],
        config.channels?.webPush.config,
      );
      const websitePushID = path(['safari', 'websitePushId'], config.channels?.webPush.config);
      const webServiceUrl = path(['safari', 'webServiceUrl'], config.channels?.webPush.config);

      return createSafariPushSubscription(authenticationToken, webServiceUrl, websitePushID);
    }

    if (isPushAPISupported) {
      return navigator.serviceWorker.ready.then(async (registration) => {
        await createPushSubscription(registration.pushManager, config);
      });
    }
  };

  return children({ createSubscription, isPushAPISupported });
}
