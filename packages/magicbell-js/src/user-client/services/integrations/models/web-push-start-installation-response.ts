import { z } from 'zod';

/**
 * Zod schema for the WebPushStartInstallationResponse model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const webPushStartInstallationResponse = z.lazy(() => {
  return z.object({
    authToken: z.string().min(8),
    publicKey: z.string().min(8).max(128),
  });
});

/**
 *
 * @typedef  {WebPushStartInstallationResponse} webPushStartInstallationResponse
 * @property {string} - Auth secret returned from PushSubscription.getKey('auth').
 * @property {string} - VAPID public key generated for this web push installation.
 */
export type WebPushStartInstallationResponse = z.infer<typeof webPushStartInstallationResponse>;

/**
 * Zod schema for mapping API responses to the WebPushStartInstallationResponse application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushStartInstallationResponseResponse = z.lazy(() => {
  return z
    .object({
      auth_token: z.string().min(8),
      public_key: z.string().min(8).max(128),
    })
    .transform((data) => ({
      authToken: data['auth_token'],
      publicKey: data['public_key'],
    }));
});

/**
 * Zod schema for mapping the WebPushStartInstallationResponse application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushStartInstallationResponseRequest = z.lazy(() => {
  return z
    .object({
      authToken: z.string().min(8),
      publicKey: z.string().min(8).max(128),
    })
    .transform((data) => ({
      auth_token: data['authToken'],
      public_key: data['publicKey'],
    }));
});
