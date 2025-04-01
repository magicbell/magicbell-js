import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoTokenPayload = z.lazy(() => {
  return z.object({
    deviceToken: z.string().min(1),
  });
});

/**
 *
 * @typedef  {ExpoTokenPayload} expoTokenPayload
 * @property {string}
 */
export type ExpoTokenPayload = z.infer<typeof expoTokenPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenPayloadResponse = z.lazy(() => {
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
export const expoTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      deviceToken: z.string().min(1),
    })
    .transform((data) => ({
      device_token: data['deviceToken'],
    }));
});
