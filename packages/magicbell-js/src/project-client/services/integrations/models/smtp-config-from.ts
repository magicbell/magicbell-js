import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
