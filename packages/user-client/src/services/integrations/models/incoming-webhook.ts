import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type IncomingWebhook = z.infer<typeof incomingWebhook>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
