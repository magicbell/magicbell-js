import { z } from 'zod';

/**
 * Zod schema for the SesConfigPayloadFrom model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const sesConfigPayloadFrom = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {SesConfigPayloadFrom} sesConfigPayloadFrom
 * @property {string} - The email address to send from
 * @property {string} - The name to send from
 */
export type SesConfigPayloadFrom = z.infer<typeof sesConfigPayloadFrom>;

/**
 * Zod schema for mapping API responses to the SesConfigPayloadFrom application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sesConfigPayloadFromResponse = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});

/**
 * Zod schema for mapping the SesConfigPayloadFrom application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sesConfigPayloadFromRequest = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});
