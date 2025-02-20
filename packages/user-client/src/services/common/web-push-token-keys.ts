// This file was generated by liblab | https://liblab.com/

import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushTokenKeys = z.lazy(() => {
  return z.object({
    auth: z.string(),
    p256dh: z.string(),
  });
});

/**
 *
 * @typedef  {WebPushTokenKeys} webPushTokenKeys
 * @property {string}
 * @property {string}
 */
export type WebPushTokenKeys = z.infer<typeof webPushTokenKeys>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenKeysResponse = z.lazy(() => {
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
export const webPushTokenKeysRequest = z.lazy(() => {
  return z.object({ auth: z.string().nullish(), p256dh: z.string().nullish() }).transform((data) => ({
    auth: data['auth'],
    p256dh: data['p256dh'],
  }));
});
