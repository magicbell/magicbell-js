import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const team = z.lazy(() => {
  return z.object({
    id: z.string(),
    name: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Team} team
 * @property {string}
 * @property {string}
 */
export type Team = z.infer<typeof team>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const teamRequest = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});
