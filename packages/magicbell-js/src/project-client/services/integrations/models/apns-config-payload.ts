import { z } from 'zod';

/**
 * Zod schema for the ApnsConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const apnsConfigPayload = z.lazy(() => {
  return z.object({
    appId: z.string().regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/),
    badge: z.string(),
    certificate: z
      .string()
      .regex(/^-+?\s?BEGIN PRIVATE KEY-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END PRIVATE KEY+-+\n?$/),
    keyId: z.string().min(10).max(10),
    payloadVersion: z.string().optional(),
    teamId: z.string().min(10).max(10),
  });
});

/**
 *
 * @typedef  {ApnsConfigPayload} apnsConfigPayload
 * @property {string} - The default bundle identifier of the application that is configured with this project. It can be overriden on a per token basis, when registering device tokens.
 * @property {Badge} - Controls whether the app icon badge counts unread or unseen notifications.
 * @property {string} - The APNs certificate in P8 format. Generate it at [developer.apple.com](https://developer.apple.com/account/resources/authkeys/add) with the 'Apple Push Notification service (APNs)' option selected.
 * @property {string} - The 10-character Key ID from your Apple Developer account used with the P8 certificate.
 * @property {PayloadVersion} - Internal payload format version used by MagicBell.
 * @property {string} - The Apple Developer Team ID that owns the configured key.
 */
export type ApnsConfigPayload = z.infer<typeof apnsConfigPayload>;

/**
 * Zod schema for mapping API responses to the ApnsConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      app_id: z.string().regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/),
      badge: z.string(),
      certificate: z
        .string()
        .regex(/^-+?\s?BEGIN PRIVATE KEY-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END PRIVATE KEY+-+\n?$/),
      key_id: z.string().min(10).max(10),
      payload_version: z.string().optional(),
      team_id: z.string().min(10).max(10),
    })
    .transform((data) => ({
      appId: data['app_id'],
      badge: data['badge'],
      certificate: data['certificate'],
      keyId: data['key_id'],
      payloadVersion: data['payload_version'],
      teamId: data['team_id'],
    }));
});

/**
 * Zod schema for mapping the ApnsConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string().regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/),
      badge: z.string(),
      certificate: z
        .string()
        .regex(/^-+?\s?BEGIN PRIVATE KEY-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END PRIVATE KEY+-+\n?$/),
      keyId: z.string().min(10).max(10),
      payloadVersion: z.string().optional(),
      teamId: z.string().min(10).max(10),
    })
    .transform((data) => ({
      app_id: data['appId'],
      badge: data['badge'],
      certificate: data['certificate'],
      key_id: data['keyId'],
      payload_version: data['payloadVersion'],
      team_id: data['teamId'],
    }));
});
