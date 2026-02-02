import { z } from 'zod';

/**
 * Zod schema for the Summary model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the Summary application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the Summary application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
