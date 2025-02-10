import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsTokenResponse1 = z.lazy(() => {
  return z.object({
    appId: z
      .string()
      .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/)
      .optional(),
    createdAt: z.string(),
    deviceToken: z.string().min(64),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    installationId: z.string().optional(),
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {ApnsTokenResponse1} apnsTokenResponse1
 * @property {string} - (Optional) The bundle identifier of the application that is registering this token. Use this field to override the default identifier specified in the projects APNs integration.
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {ApnsTokenResponseInstallationId} - (Optional) The APNs environment the token is registered for. If none is provided we assume the token is used in `production`.
 * @property {string}
 */
export type ApnsTokenResponse1 = z.infer<typeof apnsTokenResponse1>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsTokenResponse1Response = z.lazy(() => {
  return z
    .object({
      app_id: z
        .string()
        .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/)
        .optional(),
      created_at: z.string(),
      device_token: z.string().min(64),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      installation_id: z.string().optional(),
      updated_at: z.string().optional().nullable(),
    })
    .transform((data) => ({
      appId: data['app_id'],
      createdAt: data['created_at'],
      deviceToken: data['device_token'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      installationId: data['installation_id'],
      updatedAt: data['updated_at'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsTokenResponse1Request = z.lazy(() => {
  return z
    .object({
      appId: z.string().nullish(),
      createdAt: z.string().nullish(),
      deviceToken: z.string().nullish(),
      discardedAt: z.string().nullish(),
      id: z.string().nullish(),
      installationId: z.string().nullish(),
      updatedAt: z.string().nullish(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      created_at: data['createdAt'],
      device_token: data['deviceToken'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      installation_id: data['installationId'],
      updated_at: data['updatedAt'],
    }));
});
