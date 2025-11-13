import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
