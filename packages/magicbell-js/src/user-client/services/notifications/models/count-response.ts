import { z } from 'zod';

/**
 * Zod schema for the CountResponse model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const countResponse = z.lazy(() => {
  return z.object({
    count: z.number(),
  });
});

/**
 *
 * @typedef  {CountResponse} countResponse
 * @property {number} - The count of notifications matching the query.
 */
export type CountResponse = z.infer<typeof countResponse>;

/**
 * Zod schema for mapping API responses to the CountResponse application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const countResponseResponse = z.lazy(() => {
  return z
    .object({
      count: z.number(),
    })
    .transform((data) => ({
      count: data['count'],
    }));
});

/**
 * Zod schema for mapping the CountResponse application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const countResponseRequest = z.lazy(() => {
  return z
    .object({
      count: z.number(),
    })
    .transform((data) => ({
      count: data['count'],
    }));
});
