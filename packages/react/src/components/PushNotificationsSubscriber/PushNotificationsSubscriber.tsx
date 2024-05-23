import { clientSettings } from '@magicbell/react-headless';
import { isSupported, registerServiceWorker, WebPushClient, WebPushClientOptions } from '@magicbell/webpush';
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
  const isPushAPISupported = isSupported();

  useEffect(() => {
    if (skipServiceWorkerRegistration) return;
    registerServiceWorker(serviceWorkerPath).catch((error) => {
      console.error(`Error registering service worker: ${error}`);
    });
  }, [serviceWorkerPath, skipServiceWorkerRegistration]);

  const createSubscription = async () => {
    const credentials = clientSettings.getState();
    if (!credentials?.apiKey) {
      throw new Error('MagicBell Context was not found, did you wrap this in a MagicBellProvider?');
    }

    if (!credentials.userExternalId && !credentials.userEmail) {
      throw new Error("Can't subscribe without either a userExternalId or userEmail");
    }

    const options = {
      host: credentials.serverURL,
      apiKey: credentials.apiKey,
      userHmac: credentials.userKey,
      userExternalId: credentials.userExternalId,
      userEmail: credentials.userEmail,
      serviceWorkerPath,
    } as WebPushClientOptions;

    const client = new WebPushClient(options);
    return client.subscribe();
  };

  return children({ createSubscription, isPushAPISupported });
}
