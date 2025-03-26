import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { stripeConfigObject, stripeConfigObjectRequest, stripeConfigObjectResponse } from './stripe-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfStripeConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(stripeConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfStripeConfigObjects} arrayOfStripeConfigObjects
 * @property {StripeConfigObject[]}
 * @property {Links}
 */
export type ArrayOfStripeConfigObjects = z.infer<typeof arrayOfStripeConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfStripeConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(stripeConfigObjectResponse).optional(),
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
export const arrayOfStripeConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(stripeConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
