import { z } from 'zod';

/**
 * Zod schema for the SlackTokenPayloadWebhook model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackTokenPayloadWebhook = z.lazy(() => {
  return z.object({
    url: z.string().min(1),
  });
});

/**
 * Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 * @typedef  {SlackTokenPayloadWebhook} slackTokenPayloadWebhook - Obtained directly from the incoming_webhook object in the installation response from the Slack API. - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 * @property {string} - The URL for the incoming webhook from Slack
 */
export type SlackTokenPayloadWebhook = z.infer<typeof slackTokenPayloadWebhook>;

/**
 * Zod schema for mapping API responses to the SlackTokenPayloadWebhook application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackTokenPayloadWebhook application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
