import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const enterprise = z.lazy(() => {
  return z.object({
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {Enterprise} enterprise
 * @property {string}
 * @property {string}
 */
export type Enterprise = z.infer<typeof enterprise>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const enterpriseResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string(),
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
export const enterpriseRequest = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});
