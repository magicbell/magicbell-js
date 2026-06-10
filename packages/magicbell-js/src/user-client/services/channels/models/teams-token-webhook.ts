import { z } from 'zod';

/**
 * Zod schema for the TeamsTokenWebhook model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the TeamsTokenWebhook application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the TeamsTokenWebhook application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
