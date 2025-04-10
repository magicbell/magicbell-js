import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushStartInstallationResponse = z.lazy(() => {
  return z.object({
    authToken: z.string().min(8),
    publicKey: z.string().min(8).max(128),
  });
});

/**
 *
 * @typedef  {WebPushStartInstallationResponse} webPushStartInstallationResponse
 * @property {string}
 * @property {string}
 */
export type WebPushStartInstallationResponse = z.infer<typeof webPushStartInstallationResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushStartInstallationResponseResponse = z.lazy(() => {
  return z
    .object({
      auth_token: z.string().min(8),
      public_key: z.string().min(8).max(128),
    })
    .transform((data) => ({
      authToken: data['auth_token'],
      publicKey: data['public_key'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushStartInstallationResponseRequest = z.lazy(() => {
  return z
    .object({
      authToken: z.string().min(8),
      publicKey: z.string().min(8).max(128),
    })
    .transform((data) => ({
      auth_token: data['authToken'],
      public_key: data['publicKey'],
    }));
});
