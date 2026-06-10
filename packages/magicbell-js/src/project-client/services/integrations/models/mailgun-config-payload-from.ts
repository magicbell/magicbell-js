import { z } from 'zod';

/**
 * Zod schema for the MailgunConfigPayloadFrom model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const mailgunConfigPayloadFrom = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {MailgunConfigPayloadFrom} mailgunConfigPayloadFrom
 * @property {string} - The email address to send from
 * @property {string} - The name to send from
 */
export type MailgunConfigPayloadFrom = z.infer<typeof mailgunConfigPayloadFrom>;

/**
 * Zod schema for mapping API responses to the MailgunConfigPayloadFrom application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const mailgunConfigPayloadFromResponse = z.lazy(() => {
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
 * Zod schema for mapping the MailgunConfigPayloadFrom application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const mailgunConfigPayloadFromRequest = z.lazy(() => {
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
