import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { DeliveryPlan, deliveryPlan, deliveryPlanRequest, deliveryPlanResponse } from './delivery-plan.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const deliveryPlanCollection = z.lazy(() => {
  return z.object({
    data: z.array(deliveryPlan).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {DeliveryPlanCollection} deliveryPlanCollection
 * @property {DeliveryPlan[]}
 * @property {Links}
 */
export type DeliveryPlanCollection = z.infer<typeof deliveryPlanCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const deliveryPlanCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(deliveryPlanResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const deliveryPlanCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(deliveryPlanRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
