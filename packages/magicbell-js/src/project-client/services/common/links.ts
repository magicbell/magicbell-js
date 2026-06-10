import { z } from 'zod';

/**
 * Zod schema for the Links model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const links = z.lazy(() => {
  return z.object({
    first: z.string().optional(),
    next: z.string().optional().nullable(),
    prev: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {Links} links
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Links = z.infer<typeof links>;

/**
 * Zod schema for mapping API responses to the Links application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const linksResponse = z.lazy(() => {
  return z
    .object({
      first: z.string().optional(),
      next: z.string().optional().nullable(),
      prev: z.string().optional().nullable(),
    })
    .transform((data) => ({
      first: data['first'],
      next: data['next'],
      prev: data['prev'],
    }));
});

/**
 * Zod schema for mapping the Links application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const linksRequest = z.lazy(() => {
  return z
    .object({
      first: z.string().optional(),
      next: z.string().optional().nullable(),
      prev: z.string().optional().nullable(),
    })
    .transform((data) => ({
      first: data['first'],
      next: data['next'],
      prev: data['prev'],
    }));
});
