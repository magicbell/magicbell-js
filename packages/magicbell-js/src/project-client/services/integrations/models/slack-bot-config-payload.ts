import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
