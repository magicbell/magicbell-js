import { path } from 'ramda';
import { useEffect } from 'react';

import { createPushSubscription, createSafariPushSubscription } from '../../lib/push.js';
import useConfig from '../../stores/config/useConfig.js';

export interface Props {
  children: (params: { createSubscription: () => Promise<unknown>; isPushAPISupported: boolean }) => JSX.Element;
  serviceWorkerPath?: string;
  skipServiceWorkerRegistration?: boolean;
}

/**
 * Headless component to create subscriptions to web push notifications.
 *
 * @example
 * <WebPushNotificationsSubscriber>
 *   {({ createSubscription }) =>
 *     <button onClick={createSubscription}>Subscribe</button>}
 * <WebPushNotificationsSubscriber>
 */
export default function WebPushNotificationsSubscriber({
  children,
  serviceWorkerPath = '/service-worker.js',
  skipServiceWorkerRegistration = false,
}: Props) {
  const config = useConfig();
  const isSafari = 'safari' in window;
  const isPushAPISupported = 'PushManager' in window;

  useEffect(() => {
    if (!skipServiceWorkerRegistration) {
      navigator.serviceWorker.register(serviceWorkerPath);
    }
  }, [serviceWorkerPath, skipServiceWorkerRegistration]);

  const createSubscription = async () => {
    if (!config) {
      return Promise.reject(new Error('Context for MagicBell was not found'));
    }

    if (isSafari) {
      const authenticationToken = path(['safari', 'authenticationToken'], config.channels?.webPush.config) as string;
      const websitePushID = path(['safari', 'websitePushId'], config.channels?.webPush.config) as string;
      const webServiceUrl = path(['safari', 'webServiceUrl'], config.channels?.webPush.config) as string;

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
