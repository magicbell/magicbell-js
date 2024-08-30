import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackConfig = z.lazy(() => {
  return z.object({
    appId: z.string().regex(/^[0-9A-Z]+$/),
    clientId: z.string().regex(/^[0-9]+\.[0-9]+$/),
    clientSecret: z.string().min(32).max(32),
    signingSecret: z.string().min(32).max(32),
  });
});

/**
 *
 * @typedef  {SlackConfig} slackConfig
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type SlackConfig = z.infer<typeof slackConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackConfigResponse = z.lazy(() => {
  return z
    .object({
      app_id: z.string().regex(/^[0-9A-Z]+$/),
      client_id: z.string().regex(/^[0-9]+\.[0-9]+$/),
      client_secret: z.string().min(32).max(32),
      signing_secret: z.string().min(32).max(32),
    })
    .transform((data) => ({
      appId: data['app_id'],
      clientId: data['client_id'],
      clientSecret: data['client_secret'],
      signingSecret: data['signing_secret'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackConfigRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string().nullish(),
      clientId: z.string().nullish(),
      clientSecret: z.string().nullish(),
      signingSecret: z.string().nullish(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      client_id: data['clientId'],
      client_secret: data['clientSecret'],
      signing_secret: data['signingSecret'],
    }));
});
