import { useConfig } from '@magicbell/react-headless';
import { registerServiceWorker, subscribe } from '@magicbell/webpush';
import { useEffect } from 'react';

export interface Props {
  children: (params: { createSubscription: () => Promise<any>; isPushAPISupported: boolean }) => JSX.Element;
  serviceWorkerPath?: string;
  skipServiceWorkerRegistration?: boolean;
}

/**
 * Headless component to create subscriptions to push notifications for the
 * current user.
 *
 * @example
 * <PushNotificationsSubscriber>
 *   {({ createSubscription }) => (
 *     <button onClick={createSubscription}>Subscribe</button>
 *   )}
 * <PushNotificationsSubscriber>
 */
export default function PushNotificationsSubscriber({
  children,
  serviceWorkerPath = '/service-worker.js',
  skipServiceWorkerRegistration = false,
}: Props) {
  const config = useConfig();
  const isPushAPISupported = 'PushManager' in window;

  useEffect(() => {
    if (skipServiceWorkerRegistration) return;
    registerServiceWorker({ path: serviceWorkerPath }).catch((error) => {
      console.error(`Error registering service worker: ${error}`);
    });
  }, [serviceWorkerPath, skipServiceWorkerRegistration]);

  const createSubscription = async () => {
    if (!config || !config.channels) {
      new Error('MagicBell Context was not found, did you wrap this in a MagicBellProvider?');
    }

    const url = new URL(config.channels.webPush.config.subscribeUrl || '');

    return subscribe({
      host: 'https://api.magicbell.com',
      project: String(url.searchParams.get('project')),
      token: String(url.searchParams.get('access_token')),
      serviceWorkerPath,
    });
  };

  return children({ createSubscription, isPushAPISupported });
}
