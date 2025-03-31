import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const awssnsConfigPayload = z.lazy(() => {
  return z.object({
    webhookSigningSecret: z.string().min(1),
  });
});

/**
 *
 * @typedef  {AwssnsConfigPayload} awssnsConfigPayload
 * @property {string} - The signing certificate from AWS SNS
 */
export type AwssnsConfigPayload = z.infer<typeof awssnsConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const awssnsConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      webhook_signing_secret: z.string().min(1),
    })
    .transform((data) => ({
      webhookSigningSecret: data['webhook_signing_secret'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const awssnsConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      webhookSigningSecret: z.string().min(1),
    })
    .transform((data) => ({
      webhook_signing_secret: data['webhookSigningSecret'],
    }));
});
