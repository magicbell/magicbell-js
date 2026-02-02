import { z } from 'zod';

/**
 * Zod schema for the Enterprise model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const enterprise = z.lazy(() => {
  return z.object({
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {Enterprise} enterprise
 * @property {string} - Enterprise grid identifier.
 * @property {string} - Enterprise grid name.
 */
export type Enterprise = z.infer<typeof enterprise>;

/**
 * Zod schema for mapping API responses to the Enterprise application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const enterpriseResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * Zod schema for mapping the Enterprise application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const enterpriseRequest = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});
