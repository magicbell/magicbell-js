import { z } from 'zod';

/**
 * Zod schema for the ApnsToken model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const apnsToken = z.lazy(() => {
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
 * @typedef  {ApnsToken} apnsToken
 * @property {string} - The bundle identifier of the application registering this token. Use this to override the default identifier configured on the APNs integration.
 * @property {string} - The timestamp when the token was created.
 * @property {string} - The APNs device token to register with MagicBell.
 * @property {string} - The timestamp when the token was discarded, if applicable.
 * @property {string} - The unique identifier for the token.
 * @property {ApnsTokenInstallationId} - The APNs environment this token belongs to. If omitted we assume it targets `production`.
 * @property {string} - The timestamp when the token metadata last changed.
 */
export type ApnsToken = z.infer<typeof apnsToken>;

/**
 * Zod schema for mapping API responses to the ApnsToken application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsTokenResponse = z.lazy(() => {
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
 * Zod schema for mapping the ApnsToken application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsTokenRequest = z.lazy(() => {
  return z
    .object({
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
