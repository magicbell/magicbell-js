import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
