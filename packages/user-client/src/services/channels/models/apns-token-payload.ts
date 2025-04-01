import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsTokenPayload = z.lazy(() => {
  return z.object({
    appId: z
      .string()
      .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/)
      .optional(),
    deviceToken: z.string().min(64),
    installationId: z.string().optional(),
  });
});

/**
 *
 * @typedef  {ApnsTokenPayload} apnsTokenPayload
 * @property {string} - (Optional) The bundle identifier of the application that is registering this token. Use this field to override the default identifier specified in the projects APNs integration.
 * @property {string}
 * @property {ApnsTokenPayloadInstallationId} - (Optional) The APNs environment the token is registered for. If none is provided we assume the token is used in `production`.
 */
export type ApnsTokenPayload = z.infer<typeof apnsTokenPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      app_id: z
        .string()
        .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/)
        .optional(),
      device_token: z.string().min(64),
      installation_id: z.string().optional(),
    })
    .transform((data) => ({
      appId: data['app_id'],
      deviceToken: data['device_token'],
      installationId: data['installation_id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      appId: z
        .string()
        .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/)
        .optional(),
      deviceToken: z.string().min(64),
      installationId: z.string().optional(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      device_token: data['deviceToken'],
      installation_id: data['installationId'],
    }));
});
