import { z } from 'zod';

/**
 * Zod schema for the ApnsTokenPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {string} - The bundle identifier of the application registering this token. Use this to override the default identifier configured on the APNs integration.
 * @property {string} - The APNs device token to register with MagicBell.
 * @property {ApnsTokenPayloadInstallationId} - The APNs environment this token belongs to. If omitted we assume it targets `production`.
 */
export type ApnsTokenPayload = z.infer<typeof apnsTokenPayload>;

/**
 * Zod schema for mapping API responses to the ApnsTokenPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the ApnsTokenPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
