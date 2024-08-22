import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webpushConfig = z.lazy(() => {
  return z.object({
    privateKey: z.string().min(8).max(128),
    publicKey: z.string().min(8).max(128),
  });
});

/**
 *
 * @typedef  {WebpushConfig} webpushConfig
 * @property {string}
 * @property {string}
 */
export type WebpushConfig = z.infer<typeof webpushConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webpushConfigResponse = z.lazy(() => {
  return z
    .object({
      private_key: z.string().min(8).max(128),
      public_key: z.string().min(8).max(128),
    })
    .transform((data) => ({
      privateKey: data['private_key'],
      publicKey: data['public_key'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const webpushConfigRequest = z.lazy(() => {
  return z.object({ privateKey: z.string().nullish(), publicKey: z.string().nullish() }).transform((data) => ({
    private_key: data['privateKey'],
    public_key: data['publicKey'],
  }));
});
