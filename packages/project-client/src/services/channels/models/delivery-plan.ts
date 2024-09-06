import { z } from 'zod';

import {
  deliveryPlanChannels,
  deliveryPlanChannelsRequest,
  deliveryPlanChannelsResponse,
} from './delivery-plan-channels.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const deliveryPlan = z.lazy(() => {
  return z.object({
    channels: z.array(deliveryPlanChannels),
  });
});

/**
 *
 * @typedef  {DeliveryPlan} deliveryPlan
 * @property {DeliveryPlanChannels[]}
 */
export type DeliveryPlan = z.infer<typeof deliveryPlan>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const deliveryPlanResponse = z.lazy(() => {
  return z
    .object({
      channels: z.array(deliveryPlanChannelsResponse),
    })
    .transform((data) => ({
      channels: data['channels'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const deliveryPlanRequest = z.lazy(() => {
  return z.object({ channels: z.array(deliveryPlanChannelsRequest).nullish() }).transform((data) => ({
    channels: data['channels'],
  }));
});
