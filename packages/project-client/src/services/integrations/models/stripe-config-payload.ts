import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const stripeConfigPayload = z.lazy(() => {
  return z.object({
    webhookSigningSecret: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {StripeConfigPayload} stripeConfigPayload
 * @property {string} - The signing secret to verify incoming requests from Stripe
 */
export type StripeConfigPayload = z.infer<typeof stripeConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const stripeConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      webhook_signing_secret: z.string().min(1).max(100),
    })
    .transform((data) => ({
      webhookSigningSecret: data['webhook_signing_secret'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const stripeConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      webhookSigningSecret: z.string().min(1).max(100),
    })
    .transform((data) => ({
      webhook_signing_secret: data['webhookSigningSecret'],
    }));
});
