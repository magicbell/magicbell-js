import { z } from 'zod';

import {
  WebPushTokenPayloadKeys,
  webPushTokenPayloadKeys,
  webPushTokenPayloadKeysRequest,
  webPushTokenPayloadKeysResponse,
} from '../channels/models/web-push-token-payload-keys.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushTokenPayload = z.lazy(() => {
  return z.object({
    endpoint: z.string(),
    keys: webPushTokenPayloadKeys,
  });
});

/**
 *
 * @typedef  {WebPushTokenPayload} webPushTokenPayload
 * @property {string} - The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to.
 * @property {WebPushTokenPayloadKeys} - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 */
export type WebPushTokenPayload = z.infer<typeof webPushTokenPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      endpoint: z.string(),
      keys: webPushTokenPayloadKeysResponse,
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
export const webPushTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      endpoint: z.string(),
      keys: webPushTokenPayloadKeysRequest,
    })
    .transform((data) => ({
      endpoint: data['endpoint'],
      keys: data['keys'],
    }));
});
