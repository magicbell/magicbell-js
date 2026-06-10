import { z } from 'zod';

/**
 * Zod schema for the SmtpConfigFrom model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const smtpConfigFrom = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional(),
  });
});

/**
 * Default sender email address
 * @typedef  {SmtpConfigFrom} smtpConfigFrom - Default sender email address - Default sender email address
 * @property {string} - Sender email address
 * @property {string} - Sender name
 */
export type SmtpConfigFrom = z.infer<typeof smtpConfigFrom>;

/**
 * Zod schema for mapping API responses to the SmtpConfigFrom application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigFromResponse = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});

/**
 * Zod schema for mapping the SmtpConfigFrom application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigFromRequest = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});
