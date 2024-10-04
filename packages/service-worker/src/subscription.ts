import axios from 'axios';

function isEmpty(value) {
  if (value == null) return true;
  return false;
}

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

  const headers = { 'X-MAGICBELL-API-KEY': project.apiKey };
  if (!isEmpty(userEmail)) headers['X-MAGICBELL-USER-EMAIL'] = userEmail;
  if (!isEmpty(userExternalId)) headers['X-MAGICBELL-USER-EXTERNAL-ID'] = userExternalId;
  if (!isEmpty(hmacSecret)) headers['X-MAGICBELL-USER-HMAC'] = hmacSecret;

  const data = {
    web_push_subscription: {
      data: subscription.toJSON(),
    },
  };

  return axios.post('/web_push_subscriptions', data, { headers });
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
