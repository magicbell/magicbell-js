import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenPayloadWebhook = z.lazy(() => {
  return z.object({
    url: z.string().min(1),
  });
});

/**
 * Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 * @typedef  {SlackTokenPayloadWebhook} slackTokenPayloadWebhook - Obtained directly from the incoming_webhook object in the installation response from the Slack API. - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 * @property {string}
 */
export type SlackTokenPayloadWebhook = z.infer<typeof slackTokenPayloadWebhook>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenPayloadWebhookResponse = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenPayloadWebhookRequest = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});
