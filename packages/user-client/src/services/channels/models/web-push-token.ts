import { z } from 'zod';

import {
  WebPushTokenKeys,
  webPushTokenKeys,
  webPushTokenKeysRequest,
  webPushTokenKeysResponse,
} from './web-push-token-keys.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushToken = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    endpoint: z.string(),
    id: z.string(),
    keys: webPushTokenKeys,
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {WebPushToken} webPushToken
 * @property {string}
 * @property {string}
 * @property {string} - The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to.
 * @property {string}
 * @property {WebPushTokenKeys} - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 * @property {string}
 */
export type WebPushToken = z.infer<typeof webPushToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      endpoint: z.string(),
      id: z.string(),
      keys: webPushTokenKeysResponse,
      updated_at: z.string().optional().nullable(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      endpoint: data['endpoint'],
      id: data['id'],
      keys: data['keys'],
      updatedAt: data['updated_at'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      discardedAt: z.string().optional().nullable(),
      endpoint: z.string(),
      id: z.string(),
      keys: webPushTokenKeysRequest,
      updatedAt: z.string().optional().nullable(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      endpoint: data['endpoint'],
      id: data['id'],
      keys: data['keys'],
      updated_at: data['updatedAt'],
    }));
});
