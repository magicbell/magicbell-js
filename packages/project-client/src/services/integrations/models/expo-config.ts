import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoConfig = z.lazy(() => {
  return z.object({
    accessToken: z.string().min(1),
  });
});

/**
 *
 * @typedef  {ExpoConfig} expoConfig
 * @property {string}
 */
export type ExpoConfig = z.infer<typeof expoConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoConfigResponse = z.lazy(() => {
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
export const expoConfigRequest = z.lazy(() => {
  return z.object({ accessToken: z.string() }).transform((data) => ({
    access_token: data['accessToken'],
  }));
});
