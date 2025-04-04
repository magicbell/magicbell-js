import { z } from 'zod';

import { stripeConfig, stripeConfigRequest, stripeConfigResponse } from './stripe-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const stripeConfigObject = z.lazy(() => {
  return z.object({
    config: stripeConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {StripeConfigObject} stripeConfigObject
 * @property {StripeConfig}
 * @property {string}
 * @property {string}
 */
export type StripeConfigObject = z.infer<typeof stripeConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const stripeConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: stripeConfigResponse,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const stripeConfigObjectRequest = z.lazy(() => {
  return z.object({ config: stripeConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
