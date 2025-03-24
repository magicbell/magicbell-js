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
 * @property {string} - Your VAPID private key used for web push notifications. You will have generated this yourself.
 * @property {string} - Your VAPID public key used for web push notifications. You will have generated this yourself.
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
  return z.object({ privateKey: z.string(), publicKey: z.string() }).transform((data) => ({
    private_key: data['privateKey'],
    public_key: data['publicKey'],
  }));
});
