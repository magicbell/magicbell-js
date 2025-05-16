import { z } from 'zod';

import {
  StripeConfigPayload,
  stripeConfigPayload,
  stripeConfigPayloadRequest,
  stripeConfigPayloadResponse,
} from './stripe-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const stripeConfig = z.lazy(() => {
  return z.object({
    config: stripeConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {StripeConfig} stripeConfig
 * @property {StripeConfigPayload}
 * @property {string}
 * @property {string}
 */
export type StripeConfig = z.infer<typeof stripeConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const stripeConfigResponse = z.lazy(() => {
  return z
    .object({
      config: stripeConfigPayloadResponse,
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
export const stripeConfigRequest = z.lazy(() => {
  return z
    .object({
      config: stripeConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
