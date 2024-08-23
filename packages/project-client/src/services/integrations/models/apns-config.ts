import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsConfig = z.lazy(() => {
  return z.object({
    appId: z.string().regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/),
    badge: z.string(),
    certificate: z.string(),
    keyId: z.string().min(10).max(10),
    teamId: z.string().min(10).max(10),
  });
});

/**
 *
 * @typedef  {ApnsConfig} apnsConfig
 * @property {string}
 * @property {Badge}
 * @property {string}
 * @property {string}
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
      certificate: z.string(),
      key_id: z.string().min(10).max(10),
      team_id: z.string().min(10).max(10),
    })
    .transform((data) => ({
      appId: data['app_id'],
      badge: data['badge'],
      certificate: data['certificate'],
      keyId: data['key_id'],
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
      teamId: z.string().nullish(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      badge: data['badge'],
      certificate: data['certificate'],
      key_id: data['keyId'],
      team_id: data['teamId'],
    }));
});
