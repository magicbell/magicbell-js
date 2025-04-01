import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const summary = z.lazy(() => {
  return z.object({
    failures: z.number(),
    total: z.number(),
  });
});

/**
 *
 * @typedef  {Summary} summary
 * @property {number} - The number of failures while processing the broadcast.
 * @property {number} - The number of recipients that the broadcast was sent to.
 */
export type Summary = z.infer<typeof summary>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const summaryResponse = z.lazy(() => {
  return z
    .object({
      failures: z.number(),
      total: z.number(),
    })
    .transform((data) => ({
      failures: data['failures'],
      total: data['total'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const summaryRequest = z.lazy(() => {
  return z
    .object({
      failures: z.number(),
      total: z.number(),
    })
    .transform((data) => ({
      failures: data['failures'],
      total: data['total'],
    }));
});
