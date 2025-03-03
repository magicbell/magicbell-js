import { z } from 'zod';

import { webPushTokenKeys, webPushTokenKeysRequest, webPushTokenKeysResponse } from './web-push-token-keys.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushToken = z.lazy(() => {
  return z.object({
    endpoint: z.string(),
    keys: webPushTokenKeys,
  });
});

/**
 *
 * @typedef  {WebPushToken} webPushToken
 * @property {string} - The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to.
 * @property {WebPushTokenKeys} - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 */
export type WebPushToken = z.infer<typeof webPushToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenResponse = z.lazy(() => {
  return z
    .object({
      endpoint: z.string(),
      keys: webPushTokenKeysResponse,
    })
    .transform((data) => ({
      endpoint: data['endpoint'],
      keys: data['keys'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenRequest = z.lazy(() => {
  return z.object({ endpoint: z.string().nullish(), keys: webPushTokenKeysRequest.nullish() }).transform((data) => ({
    endpoint: data['endpoint'],
    keys: data['keys'],
  }));
});
