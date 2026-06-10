import { z } from 'zod';

/**
 * Zod schema for the Keys model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const keys = z.lazy(() => {
  return z.object({
    auth: z.string(),
    p256dh: z.string(),
  });
});

/**
 * The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 * @typedef  {Keys} keys - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription. - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 * @property {string} - The authentication secret obtained from PushSubscription.getKey('auth'). Used to encrypt push messages for this subscription.
 * @property {string} - The P-256 ECDH public key obtained from PushSubscription.getKey('p256dh'). Used to encrypt push messages for this subscription.
 */
export type Keys = z.infer<typeof keys>;

/**
 * Zod schema for mapping API responses to the Keys application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const keysResponse = z.lazy(() => {
  return z
    .object({
      auth: z.string(),
      p256dh: z.string(),
    })
    .transform((data) => ({
      auth: data['auth'],
      p256dh: data['p256dh'],
    }));
});

/**
 * Zod schema for mapping the Keys application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const keysRequest = z.lazy(() => {
  return z
    .object({
      auth: z.string(),
      p256dh: z.string(),
    })
    .transform((data) => ({
      auth: data['auth'],
      p256dh: data['p256dh'],
    }));
});
