import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const event = z.lazy(() => {
  return z.object({
    discardedAt: z.string().optional(),
    id: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Event} event
 * @property {string}
 * @property {string}
 */
export type Event = z.infer<typeof event>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const eventResponse = z.lazy(() => {
  return z
    .object({
      discarded_at: z.string().optional(),
      id: z.string().optional(),
    })
    .transform((data) => ({
      discardedAt: data['discarded_at'],
      id: data['id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const eventRequest = z.lazy(() => {
  return z.object({ discardedAt: z.string().nullish(), id: z.string().nullish() }).transform((data) => ({
    discarded_at: data['discardedAt'],
    id: data['id'],
  }));
});
