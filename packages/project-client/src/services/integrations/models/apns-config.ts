import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsConfig = z.lazy(() => {
  return z.object({
    appId: z.string().regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/),
    badge: z.string(),
    certificate: z.string().regex(/^-+?\s?BEGIN[A-Z ]+-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END[A-Z ]+-+\n?$/),
    keyId: z.string().min(10).max(10),
    payloadVersion: z.string().optional(),
    teamId: z.string().min(10).max(10),
  });
});

/**
 *
 * @typedef  {ApnsConfig} apnsConfig
 * @property {string}
 * @property {Badge}
 * @property {string} - The APNs certificate in PEM format. Generate it at [developer.apple.com](https://developer.apple.com/account/resources/authkeys/add) with the 'Apple Push Notification service (APNs)' option selected.
 * @property {string}
 * @property {PayloadVersion}
 * @property {string}
 */
export type ApnsConfig = z.infer<typeof apnsConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsConfigResponse = z.lazy(() => {
  return z
    .object({
      app_id: z.string().regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/),
      badge: z.string(),
      certificate: z.string().regex(/^-+?\s?BEGIN[A-Z ]+-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END[A-Z ]+-+\n?$/),
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
export const apnsConfigRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string().nullish(),
      badge: z.string().nullish(),
      certificate: z.string().nullish(),
      keyId: z.string().nullish(),
      payloadVersion: z.string().nullish(),
      teamId: z.string().nullish(),
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
