import { z } from 'zod';

/**
 * Zod schema for the ExpoConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const expoConfigPayload = z.lazy(() => {
  return z.object({
    accessToken: z.string().min(1),
  });
});

/**
 *
 * @typedef  {ExpoConfigPayload} expoConfigPayload
 * @property {string} - The Expo access token used to authenticate push notifications.
 */
export type ExpoConfigPayload = z.infer<typeof expoConfigPayload>;

/**
 * Zod schema for mapping API responses to the ExpoConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      access_token: z.string().min(1),
    })
    .transform((data) => ({
      accessToken: data['access_token'],
    }));
});

/**
 * Zod schema for mapping the ExpoConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      accessToken: z.string().min(1),
    })
    .transform((data) => ({
      access_token: data['accessToken'],
    }));
});
