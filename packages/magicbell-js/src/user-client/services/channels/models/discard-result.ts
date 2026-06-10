import { z } from 'zod';

/**
 * Zod schema for the DiscardResult model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {string} - The timestamp when the token was discarded.
 * @property {string} - The unique identifier for the discarded token.
 */
export type DiscardResult = z.infer<typeof discardResult>;

/**
 * Zod schema for mapping API responses to the DiscardResult application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the DiscardResult application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
