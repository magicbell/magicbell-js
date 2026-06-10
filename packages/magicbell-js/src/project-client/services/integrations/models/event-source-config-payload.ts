import { z } from 'zod';

/**
 * Zod schema for the EventSourceConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const eventSourceConfigPayload = z.lazy(() => {
  return z.object({
    source: z.string(),
  });
});

/**
 *
 * @typedef  {EventSourceConfigPayload} eventSourceConfigPayload
 * @property {string}
 */
export type EventSourceConfigPayload = z.infer<typeof eventSourceConfigPayload>;

/**
 * Zod schema for mapping API responses to the EventSourceConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventSourceConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      source: z.string(),
    })
    .transform((data) => ({
      source: data['source'],
    }));
});

/**
 * Zod schema for mapping the EventSourceConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventSourceConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      source: z.string(),
    })
    .transform((data) => ({
      source: data['source'],
    }));
});
