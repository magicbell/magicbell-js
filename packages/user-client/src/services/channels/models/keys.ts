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
 *
 * @typedef  {Keys} keys
 * @property {string}
 * @property {string}
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
  return z.object({ auth: z.string().nullish(), p256dh: z.string().nullish() }).transform((data) => ({
    auth: data['auth'],
    p256dh: data['p256dh'],
  }));
});
