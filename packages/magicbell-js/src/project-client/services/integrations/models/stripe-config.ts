import { z } from 'zod';

import {
  StripeConfigPayload,
  stripeConfigPayload,
  stripeConfigPayloadRequest,
  stripeConfigPayloadResponse,
} from './stripe-config-payload.js';

/**
 * Zod schema for the StripeConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the StripeConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the StripeConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
