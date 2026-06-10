import { z } from 'zod';

/**
 * Zod schema for the SlackBotConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackBotConfigPayload = z.lazy(() => {
  return z.object({
    enabled: z.boolean(),
  });
});

/**
 *
 * @typedef  {SlackBotConfigPayload} slackBotConfigPayload
 * @property {boolean}
 */
export type SlackBotConfigPayload = z.infer<typeof slackBotConfigPayload>;

/**
 * Zod schema for mapping API responses to the SlackBotConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackBotConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      enabled: z.boolean(),
    })
    .transform((data) => ({
      enabled: data['enabled'],
    }));
});

/**
 * Zod schema for mapping the SlackBotConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackBotConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      enabled: z.boolean(),
    })
    .transform((data) => ({
      enabled: data['enabled'],
    }));
});
