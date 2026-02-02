import { z } from 'zod';

/**
 * Zod schema for the SendgridConfigPayloadReplyTo model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const sendgridConfigPayloadReplyTo = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {SendgridConfigPayloadReplyTo} sendgridConfigPayloadReplyTo
 * @property {string} - The email address to reply to
 * @property {string} - The name to reply to
 */
export type SendgridConfigPayloadReplyTo = z.infer<typeof sendgridConfigPayloadReplyTo>;

/**
 * Zod schema for mapping API responses to the SendgridConfigPayloadReplyTo application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sendgridConfigPayloadReplyToResponse = z.lazy(() => {
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
 * Zod schema for mapping the SendgridConfigPayloadReplyTo application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sendgridConfigPayloadReplyToRequest = z.lazy(() => {
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
