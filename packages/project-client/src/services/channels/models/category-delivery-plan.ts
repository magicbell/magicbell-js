import { z } from 'zod';

import {
  categoryDeliveryPlanChannels,
  categoryDeliveryPlanChannelsRequest,
  categoryDeliveryPlanChannelsResponse,
} from './category-delivery-plan-channels.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const categoryDeliveryPlan = z.lazy(() => {
  return z.object({
    category: z
      .string()
      .min(3)
      .regex(/^[a-zA-Z0-9_]+$/),
    channels: z.array(categoryDeliveryPlanChannels),
    disabled: z.boolean().optional(),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryPlan} categoryDeliveryPlan
 * @property {string}
 * @property {CategoryDeliveryPlanChannels[]}
 * @property {boolean}
 */
export type CategoryDeliveryPlan = z.infer<typeof categoryDeliveryPlan>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryDeliveryPlanResponse = z.lazy(() => {
  return z
    .object({
      category: z
        .string()
        .min(3)
        .regex(/^[a-zA-Z0-9_]+$/),
      channels: z.array(categoryDeliveryPlanChannelsResponse),
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
export const categoryDeliveryPlanRequest = z.lazy(() => {
  return z
    .object({
      category: z.string().nullish(),
      channels: z.array(categoryDeliveryPlanChannelsRequest).nullish(),
      disabled: z.boolean().nullish(),
    })
    .transform((data) => ({
      category: data['category'],
      channels: data['channels'],
      disabled: data['disabled'],
    }));
});
