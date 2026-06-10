import { z } from 'zod';

import { Keys, keys, keysRequest, keysResponse } from './keys.js';

/**
 * Zod schema for the WebPushToken model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const webPushToken = z.lazy(() => {
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
 * @typedef  {WebPushToken} webPushToken
 * @property {string} - The timestamp when the token was created.
 * @property {string} - The timestamp when the token was discarded, if applicable.
 * @property {string} - The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to.
 * @property {string} - The unique identifier for the token.
 * @property {Keys} - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 * @property {string} - The timestamp when the token metadata last changed.
 */
export type WebPushToken = z.infer<typeof webPushToken>;

/**
 * Zod schema for mapping API responses to the WebPushToken application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushTokenResponse = z.lazy(() => {
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
 * Zod schema for mapping the WebPushToken application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      discardedAt: z.string().optional().nullable(),
      endpoint: z.string(),
      id: z.string(),
      keys: keysRequest,
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
