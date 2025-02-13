import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushTokenResponseKeys = z.lazy(() => {
  return z.object({
    auth: z.string(),
    p256dh: z.string(),
  });
});

/**
 *
 * @typedef  {WebPushTokenResponseKeys} webPushTokenResponseKeys
 * @property {string}
 * @property {string}
 */
export type WebPushTokenResponseKeys = z.infer<typeof webPushTokenResponseKeys>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenResponseKeysResponse = z.lazy(() => {
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
export const webPushTokenResponseKeysRequest = z.lazy(() => {
  return z.object({ auth: z.string().nullish(), p256dh: z.string().nullish() }).transform((data) => ({
    auth: data['auth'],
    p256dh: data['p256dh'],
  }));
});
