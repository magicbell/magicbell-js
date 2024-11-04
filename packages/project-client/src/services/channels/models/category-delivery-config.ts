import { z } from 'zod';

import {
  categoryDeliveryConfigChannels,
  categoryDeliveryConfigChannelsRequest,
  categoryDeliveryConfigChannelsResponse,
} from './category-delivery-config-channels.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const categoryDeliveryConfig = z.lazy(() => {
  return z.object({
    category: z
      .string()
      .min(3)
      .regex(/^[a-zA-Z0-9_]+$/),
    channels: z.array(categoryDeliveryConfigChannels),
    disabled: z.boolean().optional(),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryConfig} categoryDeliveryConfig
 * @property {string}
 * @property {CategoryDeliveryConfigChannels[]}
 * @property {boolean}
 */
export type CategoryDeliveryConfig = z.infer<typeof categoryDeliveryConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigResponse = z.lazy(() => {
  return z
    .object({
      category: z
        .string()
        .min(3)
        .regex(/^[a-zA-Z0-9_]+$/),
      channels: z.array(categoryDeliveryConfigChannelsResponse),
      disabled: z.boolean().optional(),
    })
    .transform((data) => ({
      category: data['category'],
      channels: data['channels'],
      disabled: data['disabled'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigRequest = z.lazy(() => {
  return z
    .object({
      category: z.string().nullish(),
      channels: z.array(categoryDeliveryConfigChannelsRequest).nullish(),
      disabled: z.boolean().nullish(),
    })
    .transform((data) => ({
      category: data['category'],
      channels: data['channels'],
      disabled: data['disabled'],
    }));
});
