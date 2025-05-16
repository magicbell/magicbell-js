import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const categoryDeliveryConfigChannels = z.lazy(() => {
  return z.object({
    channel: z.string(),
    delay: z.number().gte(0).optional(),
    if: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryConfigChannels} categoryDeliveryConfigChannels
 * @property {Channel}
 * @property {number}
 * @property {string}
 */
export type CategoryDeliveryConfigChannels = z.infer<typeof categoryDeliveryConfigChannels>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigChannelsResponse = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      delay: z.number().gte(0).optional(),
      if: z.string().optional().nullable(),
    })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      if: data['if'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigChannelsRequest = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      delay: z.number().gte(0).optional(),
      if: z.string().optional().nullable(),
    })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      if: data['if'],
    }));
});
