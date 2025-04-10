import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { StripeConfig, stripeConfig, stripeConfigRequest, stripeConfigResponse } from './stripe-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const stripeConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(stripeConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {StripeConfigCollection} stripeConfigCollection
 * @property {StripeConfig[]}
 * @property {Links}
 */
export type StripeConfigCollection = z.infer<typeof stripeConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const stripeConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(stripeConfigResponse).optional(),
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
export const stripeConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(stripeConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
