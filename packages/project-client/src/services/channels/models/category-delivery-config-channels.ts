import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const categoryDeliveryConfigChannels = z.lazy(() => {
  return z.object({
    channel: z.string(),
    delay: z.number().gte(0).optional(),
    disabled: z.boolean().optional(),
    if: z.string().optional(),
    priority: z.number().gte(0).optional(),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryConfigChannels} categoryDeliveryConfigChannels
 * @property {ChannelsChannel2}
 * @property {number}
 * @property {boolean}
 * @property {string}
 * @property {number}
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
      disabled: z.boolean().optional(),
      if: z.string().optional(),
      priority: z.number().gte(0).optional(),
    })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      disabled: data['disabled'],
      if: data['if'],
      priority: data['priority'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigChannelsRequest = z.lazy(() => {
  return z
    .object({
      channel: z.string().nullish(),
      delay: z.number().nullish(),
      disabled: z.boolean().nullish(),
      if: z.string().nullish(),
      priority: z.number().nullish(),
    })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      disabled: data['disabled'],
      if: data['if'],
      priority: data['priority'],
    }));
});
