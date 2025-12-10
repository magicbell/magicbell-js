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
 * The summary counts for total recipients and failures.
 * @typedef  {Summary} summary - The summary counts for total recipients and failures. - The summary counts for total recipients and failures.
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
