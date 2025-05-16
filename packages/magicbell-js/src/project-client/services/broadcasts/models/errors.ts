import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const errors = z.lazy(() => {
  return z.object({
    message: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Errors} errors
 * @property {string}
 */
export type Errors = z.infer<typeof errors>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
