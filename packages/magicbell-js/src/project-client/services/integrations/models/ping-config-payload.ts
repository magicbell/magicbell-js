import { z } from 'zod';

/**
 * Zod schema for the PingConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const pingConfigPayload = z.lazy(() => {
  return z.object({
    url: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {PingConfigPayload} pingConfigPayload
 * @property {string} - URL to ping
 */
export type PingConfigPayload = z.infer<typeof pingConfigPayload>;

/**
 * Zod schema for mapping API responses to the PingConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const pingConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1).max(100),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});

/**
 * Zod schema for mapping the PingConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const pingConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1).max(100),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});
