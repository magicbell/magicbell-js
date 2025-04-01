import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsTokenPayloadWebhook = z.lazy(() => {
  return z.object({
    url: z.string().optional(),
  });
});

/**
 *
 * @typedef  {TeamsTokenPayloadWebhook} teamsTokenPayloadWebhook
 * @property {string}
 */
export type TeamsTokenPayloadWebhook = z.infer<typeof teamsTokenPayloadWebhook>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenPayloadWebhookResponse = z.lazy(() => {
  return z
    .object({
      url: z.string().optional(),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenPayloadWebhookRequest = z.lazy(() => {
  return z
    .object({
      url: z.string().optional(),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});
