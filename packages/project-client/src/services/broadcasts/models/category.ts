import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const category = z.lazy(() => {
  return z.union([z.string(), z.any()]);
});

/**
 *
 * @typedef  {Category} category
 * @property {string}
 * @property {any}
 */
export type Category = z.infer<typeof category>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryResponse = z.lazy(() => {
  return z.union([z.string(), z.any()]);
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const categoryRequest = z.lazy(() => {
  return z.union([z.string(), z.any()]);
});
