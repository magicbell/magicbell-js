import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackConfigPayload = z.lazy(() => {
  return z.object({
    appId: z.string().regex(/^[0-9A-Z]+$/),
    clientId: z.string().regex(/^[0-9]+\.[0-9]+$/),
    clientSecret: z.string().min(32).max(32),
    signingSecret: z.string().min(32).max(32),
  });
});

/**
 *
 * @typedef  {SlackConfigPayload} slackConfigPayload
 * @property {string} - The Slack app ID that can be found in the app's settings page of the Slack API dashboard.
 * @property {string} - The Slack client ID that can be found in the app's settings page of the Slack API dashboard.
 * @property {string} - The Slack client secret that can be found in the app's settings page of the Slack API dashboard.
 * @property {string} - The Slack signing secret that can be found in the app's settings page of the Slack API dashboard.
 */
export type SlackConfigPayload = z.infer<typeof slackConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackConfigPayloadResponse = z.lazy(() => {
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
export const slackConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string().regex(/^[0-9A-Z]+$/),
      clientId: z.string().regex(/^[0-9]+\.[0-9]+$/),
      clientSecret: z.string().min(32).max(32),
      signingSecret: z.string().min(32).max(32),
    })
    .transform((data) => ({
      app_id: data['appId'],
      client_id: data['clientId'],
      client_secret: data['clientSecret'],
      signing_secret: data['signingSecret'],
    }));
});
