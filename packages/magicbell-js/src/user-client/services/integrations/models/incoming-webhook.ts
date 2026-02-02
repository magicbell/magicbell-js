import { z } from 'zod';

/**
 * Zod schema for the IncomingWebhook model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const incomingWebhook = z.lazy(() => {
  return z.object({
    channel: z.string(),
    configurationUrl: z.string(),
    url: z.string(),
  });
});

/**
 *
 * @typedef  {IncomingWebhook} incomingWebhook
 * @property {string} - Human readable name for the webhook channel.
 * @property {string} - URL users can visit to manage the webhook.
 * @property {string} - Webhook URL that Slack posts events to.
 */
export type IncomingWebhook = z.infer<typeof incomingWebhook>;

/**
 * Zod schema for mapping API responses to the IncomingWebhook application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const incomingWebhookResponse = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      configuration_url: z.string(),
      url: z.string(),
    })
    .transform((data) => ({
      channel: data['channel'],
      configurationUrl: data['configuration_url'],
      url: data['url'],
    }));
});

/**
 * Zod schema for mapping the IncomingWebhook application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const incomingWebhookRequest = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      configurationUrl: z.string(),
      url: z.string(),
    })
    .transform((data) => ({
      channel: data['channel'],
      configuration_url: data['configurationUrl'],
      url: data['url'],
    }));
});
