import { z } from 'zod';

/**
 * Zod schema for the FcmTokenPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const fcmTokenPayload = z.lazy(() => {
  return z.object({
    deviceToken: z.string().min(64),
  });
});

/**
 *
 * @typedef  {FcmTokenPayload} fcmTokenPayload
 * @property {string} - The Firebase Cloud Messaging device registration token to associate with the user.
 */
export type FcmTokenPayload = z.infer<typeof fcmTokenPayload>;

/**
 * Zod schema for mapping API responses to the FcmTokenPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      device_token: z.string().min(64),
    })
    .transform((data) => ({
      deviceToken: data['device_token'],
    }));
});

/**
 * Zod schema for mapping the FcmTokenPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      deviceToken: z.string().min(64),
    })
    .transform((data) => ({
      device_token: data['deviceToken'],
    }));
});
