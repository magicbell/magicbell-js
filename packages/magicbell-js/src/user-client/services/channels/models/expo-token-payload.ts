import { z } from 'zod';

/**
 * Zod schema for the ExpoTokenPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const expoTokenPayload = z.lazy(() => {
  return z.object({
    deviceToken: z.string().min(1),
  });
});

/**
 *
 * @typedef  {ExpoTokenPayload} expoTokenPayload
 * @property {string} - The Expo push token returned by the Expo client.
 */
export type ExpoTokenPayload = z.infer<typeof expoTokenPayload>;

/**
 * Zod schema for mapping API responses to the ExpoTokenPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      device_token: z.string().min(1),
    })
    .transform((data) => ({
      deviceToken: data['device_token'],
    }));
});

/**
 * Zod schema for mapping the ExpoTokenPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      deviceToken: z.string().min(1),
    })
    .transform((data) => ({
      device_token: data['deviceToken'],
    }));
});
