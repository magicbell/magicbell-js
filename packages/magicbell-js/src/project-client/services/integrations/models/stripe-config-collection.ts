import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { StripeConfig, stripeConfig, stripeConfigRequest, stripeConfigResponse } from './stripe-config.js';

/**
 * Zod schema for the StripeConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the StripeConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the StripeConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
