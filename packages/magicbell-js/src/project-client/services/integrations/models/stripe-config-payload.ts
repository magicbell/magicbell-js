import { z } from 'zod';

/**
 * Zod schema for the StripeConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const stripeConfigPayload = z.lazy(() => {
  return z.object({
    id: z.string().optional(),
    webhookSigningSecret: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {StripeConfigPayload} stripeConfigPayload
 * @property {string} - The unique identifier for this configuration
 * @property {string} - The signing secret to verify incoming requests from Stripe
 */
export type StripeConfigPayload = z.infer<typeof stripeConfigPayload>;

/**
 * Zod schema for mapping API responses to the StripeConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const stripeConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      id: z.string().optional(),
      webhook_signing_secret: z.string().min(1).max(100),
    })
    .transform((data) => ({
      id: data['id'],
      webhookSigningSecret: data['webhook_signing_secret'],
    }));
});

/**
 * Zod schema for mapping the StripeConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const stripeConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      id: z.string().optional(),
      webhookSigningSecret: z.string().min(1).max(100),
    })
    .transform((data) => ({
      id: data['id'],
      webhook_signing_secret: data['webhookSigningSecret'],
    }));
});
