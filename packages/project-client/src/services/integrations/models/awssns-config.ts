import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const awssnsConfig = z.lazy(() => {
  return z.object({
    webhookSigningSecret: z.string().min(1),
  });
});

/**
 *
 * @typedef  {AwssnsConfig} awssnsConfig
 * @property {string} - The signing certificate from AWS SNS
 */
export type AwssnsConfig = z.infer<typeof awssnsConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const awssnsConfigResponse = z.lazy(() => {
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
export const awssnsConfigRequest = z.lazy(() => {
  return z.object({ webhookSigningSecret: z.string().nullish() }).transform((data) => ({
    webhook_signing_secret: data['webhookSigningSecret'],
  }));
});
