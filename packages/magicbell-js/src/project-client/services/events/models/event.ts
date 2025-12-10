import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
