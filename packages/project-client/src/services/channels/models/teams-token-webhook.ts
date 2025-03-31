import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsTokenWebhook = z.lazy(() => {
  return z.object({
    url: z.string().optional(),
  });
});

/**
 *
 * @typedef  {TeamsTokenWebhook} teamsTokenWebhook
 * @property {string}
 */
export type TeamsTokenWebhook = z.infer<typeof teamsTokenWebhook>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenWebhookResponse = z.lazy(() => {
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
export const teamsTokenWebhookRequest = z.lazy(() => {
  return z
    .object({
      url: z.string().optional(),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});
