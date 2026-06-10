import { z } from 'zod';

/**
 * Zod schema for the Errors model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const errors = z.lazy(() => {
  return z.object({
    message: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Errors} errors
 * @property {string} - The details about the processing error.
 */
export type Errors = z.infer<typeof errors>;

/**
 * Zod schema for mapping API responses to the Errors application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const errorsResponse = z.lazy(() => {
  return z
    .object({
      message: z.string().optional(),
    })
    .transform((data) => ({
      message: data['message'],
    }));
});

/**
 * Zod schema for mapping the Errors application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const errorsRequest = z.lazy(() => {
  return z
    .object({
      message: z.string().optional(),
    })
    .transform((data) => ({
      message: data['message'],
    }));
});
