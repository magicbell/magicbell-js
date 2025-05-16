import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoConfigPayload = z.lazy(() => {
  return z.object({
    accessToken: z.string().min(1),
  });
});

/**
 *
 * @typedef  {ExpoConfigPayload} expoConfigPayload
 * @property {string}
 */
export type ExpoConfigPayload = z.infer<typeof expoConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      access_token: z.string().min(1),
    })
    .transform((data) => ({
      accessToken: data['access_token'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const expoConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      accessToken: z.string().min(1),
    })
    .transform((data) => ({
      access_token: data['accessToken'],
    }));
});
