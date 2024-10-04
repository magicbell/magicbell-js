function stringToUint8Array(plainString: string) {
  const padding = '='.repeat((4 - (plainString.length % 4)) % 4);
  const base64 = (plainString + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

/**
 * Store a subscription in the backend so we can notify this user later.
 *
 * @param subscription The push subscription
 */
export function storeSubscription(
  subscription: PushSubscription,
  user: { email?: string; externalId?: string; hmacSecret?: string },
  project,
) {
  const { email: userEmail, externalId: userExternalId, hmacSecret } = user;

  const headers = {
    'content-type': 'application/json',
    'x-magicbell-api-key': project.apiKey,
  };

  if (userEmail) headers['x-magicbell-user-email'] = userEmail;
  if (userExternalId) headers['x-magicbell-user-external-id'] = userExternalId;
  if (hmacSecret) headers['x-magicbell-user-hmac'] = hmacSecret;

  const data = {
    web_push_subscription: {
      data: subscription.toJSON(),
    },
  };

  void fetch('/web_push_subscriptions', {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  });
}

/**
 * Request permission to send push notifications.
 *
 * @param pushManager
 * @param publicKey VAPID public key
 */
export function subscribeToPushNotifications(pushManager: PushManager, publicKey: string) {
  const applicationServerKey = stringToUint8Array(publicKey);
  return pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
}
