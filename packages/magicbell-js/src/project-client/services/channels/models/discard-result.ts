import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const discardResult = z.lazy(() => {
  return z.object({
    discardedAt: z.string().optional(),
    id: z.string().optional(),
  });
});

/**
 *
 * @typedef  {DiscardResult} discardResult
 * @property {string}
 * @property {string}
 */
export type DiscardResult = z.infer<typeof discardResult>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const discardResultResponse = z.lazy(() => {
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
export const discardResultRequest = z.lazy(() => {
  return z
    .object({
      discardedAt: z.string().optional(),
      id: z.string().optional(),
    })
    .transform((data) => ({
      discarded_at: data['discardedAt'],
      id: data['id'],
    }));
});
