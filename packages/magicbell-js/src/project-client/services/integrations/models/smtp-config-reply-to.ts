import { z } from 'zod';

/**
 * Zod schema for the SmtpConfigReplyTo model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const smtpConfigReplyTo = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional(),
  });
});

/**
 * Reply-to email address
 * @typedef  {SmtpConfigReplyTo} smtpConfigReplyTo - Reply-to email address - Reply-to email address
 * @property {string} - Reply-to email address
 * @property {string} - Reply-to name
 */
export type SmtpConfigReplyTo = z.infer<typeof smtpConfigReplyTo>;

/**
 * Zod schema for mapping API responses to the SmtpConfigReplyTo application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigReplyToResponse = z.lazy(() => {
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
 * Zod schema for mapping the SmtpConfigReplyTo application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigReplyToRequest = z.lazy(() => {
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
