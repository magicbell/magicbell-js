import { z } from 'zod';

/**
 * Zod schema for the SlackTokenWebhook model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackTokenWebhook = z.lazy(() => {
  return z.object({
    url: z.string().min(1),
  });
});

/**
 * Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 * @typedef  {SlackTokenWebhook} slackTokenWebhook - Obtained directly from the incoming_webhook object in the installation response from the Slack API. - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 * @property {string} - The URL for the incoming webhook from Slack
 */
export type SlackTokenWebhook = z.infer<typeof slackTokenWebhook>;

/**
 * Zod schema for mapping API responses to the SlackTokenWebhook application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackTokenWebhookResponse = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});

/**
 * Zod schema for mapping the SlackTokenWebhook application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackTokenWebhookRequest = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});
