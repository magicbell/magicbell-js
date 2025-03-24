import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fcmToken = z.lazy(() => {
  return z.object({
    deviceToken: z.string().min(64),
    installationId: z.string().optional(),
  });
});

/**
 *
 * @typedef  {FcmToken} fcmToken
 * @property {string}
 * @property {FcmTokenInstallationId}
 */
export type FcmToken = z.infer<typeof fcmToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmTokenResponse = z.lazy(() => {
  return z
    .object({
      device_token: z.string().min(64),
      installation_id: z.string().optional(),
    })
    .transform((data) => ({
      deviceToken: data['device_token'],
      installationId: data['installation_id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmTokenRequest = z.lazy(() => {
  return z.object({ deviceToken: z.string(), installationId: z.string().optional() }).transform((data) => ({
    device_token: data['deviceToken'],
    installation_id: data['installationId'],
  }));
});
