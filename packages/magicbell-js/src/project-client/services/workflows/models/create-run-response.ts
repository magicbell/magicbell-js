import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const createRunResponse = z.lazy(() => {
  return z.object({
    id: z.string(),
  });
});

/**
 *
 * @typedef  {CreateRunResponse} createRunResponse
 * @property {string}
 */
export type CreateRunResponse = z.infer<typeof createRunResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const createRunResponseResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const createRunResponseRequest = z.lazy(() => {
  return z
    .object({
      id: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
    }));
});
