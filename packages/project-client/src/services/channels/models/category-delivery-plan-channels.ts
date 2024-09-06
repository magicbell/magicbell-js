import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const categoryDeliveryPlanChannels = z.lazy(() => {
  return z.object({
    channel: z.string(),
    delay: z.number().gte(0).optional(),
    if: z.string().optional(),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryPlanChannels} categoryDeliveryPlanChannels
 * @property {ChannelsChannel2}
 * @property {number}
 * @property {string}
 */
export type CategoryDeliveryPlanChannels = z.infer<typeof categoryDeliveryPlanChannels>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryPlanChannelsResponse = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      delay: z.number().gte(0).optional(),
      if: z.string().optional(),
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
export const categoryDeliveryPlanChannelsRequest = z.lazy(() => {
  return z
    .object({ channel: z.string().nullish(), delay: z.number().nullish(), if: z.string().nullish() })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      if: data['if'],
    }));
});
