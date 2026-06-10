import { z } from 'zod';

/**
 * Zod schema for the Event model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const event = z.lazy(() => {
  return z.object({
    code: z.number().optional(),
    context: z.any().optional().nullable(),
    id: z.string(),
    level: z.string().optional(),
    log: z.string().optional().nullable(),
    payload: z.any().optional().nullable(),
    timestamp: z.string(),
    type: z.string(),
  });
});

/**
 *
 * @typedef  {Event} event
 * @property {number} - The numeric code that categorizes the event.
 * @property {any} - Additional contextual attributes for the event.
 * @property {string} - The unique identifier for the event.
 * @property {string} - The severity level assigned to the event.
 * @property {string} - A human-readable log message.
 * @property {any} - The raw payload delivered by the event source.
 * @property {string} - The time at which the event was recorded.
 * @property {string} - The type of event that occurred.
 */
export type Event = z.infer<typeof event>;

/**
 * Zod schema for mapping API responses to the Event application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventResponse = z.lazy(() => {
  return z
    .object({
      code: z.number().optional(),
      context: z.any().optional().nullable(),
      id: z.string(),
      level: z.string().optional(),
      log: z.string().optional().nullable(),
      payload: z.any().optional().nullable(),
      timestamp: z.string(),
      type: z.string(),
    })
    .transform((data) => ({
      code: data['code'],
      context: data['context'],
      id: data['id'],
      level: data['level'],
      log: data['log'],
      payload: data['payload'],
      timestamp: data['timestamp'],
      type: data['type'],
    }));
});

/**
 * Zod schema for mapping the Event application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventRequest = z.lazy(() => {
  return z
    .object({
      code: z.number().optional(),
      context: z.any().optional().nullable(),
      id: z.string(),
      level: z.string().optional(),
      log: z.string().optional().nullable(),
      payload: z.any().optional().nullable(),
      timestamp: z.string(),
      type: z.string(),
    })
    .transform((data) => ({
      code: data['code'],
      context: data['context'],
      id: data['id'],
      level: data['level'],
      log: data['log'],
      payload: data['payload'],
      timestamp: data['timestamp'],
      type: data['type'],
    }));
});
