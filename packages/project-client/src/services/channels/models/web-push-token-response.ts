import { z } from 'zod';

import { keys, keysRequest, keysResponse } from './keys.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushTokenResponse = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    endpoint: z.string(),
    id: z.string(),
    keys: keys,
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {WebPushTokenResponse} webPushTokenResponse
 * @property {string}
 * @property {string}
 * @property {string} - The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to.
 * @property {string}
 * @property {Keys} - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 * @property {string}
 */
export type WebPushTokenResponse = z.infer<typeof webPushTokenResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenResponseResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      endpoint: z.string(),
      id: z.string(),
      keys: keysResponse,
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
export const webPushTokenResponseRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().nullish(),
      discardedAt: z.string().nullish(),
      endpoint: z.string().nullish(),
      id: z.string().nullish(),
      keys: keysRequest.nullish(),
      updatedAt: z.string().nullish(),
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
