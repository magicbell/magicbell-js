import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * @property {Badge}
 * @property {string} - The APNs certificate in P8 format. Generate it at [developer.apple.com](https://developer.apple.com/account/resources/authkeys/add) with the 'Apple Push Notification service (APNs)' option selected.
 * @property {string}
 * @property {PayloadVersion}
 * @property {string}
 */
export type ApnsConfigPayload = z.infer<typeof apnsConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
