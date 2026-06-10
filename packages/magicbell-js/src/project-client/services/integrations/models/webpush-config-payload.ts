import { z } from 'zod';

/**
 * Zod schema for the WebpushConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const webpushConfigPayload = z.lazy(() => {
  return z.object({
    privateKey: z.string().min(8).max(128),
    publicKey: z.string().min(8).max(128),
  });
});

/**
 *
 * @typedef  {WebpushConfigPayload} webpushConfigPayload
 * @property {string} - VAPID private key.
 * @property {string} - VAPID public key - read more at https://magicbell.com/tools/vapid-keys.
 */
export type WebpushConfigPayload = z.infer<typeof webpushConfigPayload>;

/**
 * Zod schema for mapping API responses to the WebpushConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webpushConfigPayloadResponse = z.lazy(() => {
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
 * Zod schema for mapping the WebpushConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webpushConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      privateKey: z.string().min(8).max(128),
      publicKey: z.string().min(8).max(128),
    })
    .transform((data) => ({
      private_key: data['privateKey'],
      public_key: data['publicKey'],
    }));
});
