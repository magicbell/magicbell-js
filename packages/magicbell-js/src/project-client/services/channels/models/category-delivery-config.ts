import { z } from 'zod';

import {
  CategoryDeliveryConfigChannels,
  categoryDeliveryConfigChannels,
  categoryDeliveryConfigChannelsRequest,
  categoryDeliveryConfigChannelsResponse,
} from './category-delivery-config-channels.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const categoryDeliveryConfig = z.lazy(() => {
  return z.object({
    channels: z.array(categoryDeliveryConfigChannels),
    disabled: z.boolean().optional(),
    key: z
      .string()
      .min(3)
      .regex(/^[A-Za-z0-9_.\-:\/]+$/),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryConfig} categoryDeliveryConfig
 * @property {CategoryDeliveryConfigChannels[]}
 * @property {boolean}
 * @property {string}
 */
export type CategoryDeliveryConfig = z.infer<typeof categoryDeliveryConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigResponse = z.lazy(() => {
  return z
    .object({
      channels: z.array(categoryDeliveryConfigChannelsResponse),
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9_.\-:\/]+$/),
    })
    .transform((data) => ({
      channels: data['channels'],
      disabled: data['disabled'],
      key: data['key'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryConfigRequest = z.lazy(() => {
  return z
    .object({
      channels: z.array(categoryDeliveryConfigChannelsRequest),
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9_.\-:\/]+$/),
    })
    .transform((data) => ({
      channels: data['channels'],
      disabled: data['disabled'],
      key: data['key'],
    }));
});
