import { z } from 'zod';

/**
 * Zod schema for the TeamsTokenPayloadWebhook model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the TeamsTokenPayloadWebhook application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the TeamsTokenPayloadWebhook application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
