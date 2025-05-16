import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenPayloadOauth = z.lazy(() => {
  return z.object({
    channelId: z.string(),
    installationId: z.string(),
    scope: z.string().optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenPayloadOauth} slackTokenPayloadOauth
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type SlackTokenPayloadOauth = z.infer<typeof slackTokenPayloadOauth>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenPayloadOauthResponse = z.lazy(() => {
  return z
    .object({
      channel_id: z.string(),
      installation_id: z.string(),
      scope: z.string().optional(),
    })
    .transform((data) => ({
      channelId: data['channel_id'],
      installationId: data['installation_id'],
      scope: data['scope'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenPayloadOauthRequest = z.lazy(() => {
  return z
    .object({
      channelId: z.string(),
      installationId: z.string(),
      scope: z.string().optional(),
    })
    .transform((data) => ({
      channel_id: data['channelId'],
      installation_id: data['installationId'],
      scope: data['scope'],
    }));
});
