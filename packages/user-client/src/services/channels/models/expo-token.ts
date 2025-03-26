import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoToken = z.lazy(() => {
  return z.object({
    deviceToken: z.string().min(1),
  });
});

/**
 *
 * @typedef  {ExpoToken} expoToken
 * @property {string}
 */
export type ExpoToken = z.infer<typeof expoToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenResponse = z.lazy(() => {
  return z
    .object({
      device_token: z.string().min(1),
    })
    .transform((data) => ({
      deviceToken: data['device_token'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenRequest = z.lazy(() => {
  return z.object({ deviceToken: z.string() }).transform((data) => ({
    device_token: data['deviceToken'],
  }));
});
