import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const userDiscardResult = z.lazy(() => {
  return z.object({
    discardedAt: z.string().optional(),
    id: z.string().optional(),
  });
});

/**
 *
 * @typedef  {UserDiscardResult} userDiscardResult
 * @property {string}
 * @property {string}
 */
export type UserDiscardResult = z.infer<typeof userDiscardResult>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const userDiscardResultResponse = z.lazy(() => {
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
export const userDiscardResultRequest = z.lazy(() => {
  return z.object({ discardedAt: z.string().optional(), id: z.string().optional() }).transform((data) => ({
    discarded_at: data['discardedAt'],
    id: data['id'],
  }));
});
