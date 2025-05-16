import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const links = z.lazy(() => {
  return z.object({
    first: z.string().optional(),
    next: z.string().optional().nullable(),
    prev: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {Links} links
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Links = z.infer<typeof links>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const linksResponse = z.lazy(() => {
  return z
    .object({
      first: z.string().optional(),
      next: z.string().optional().nullable(),
      prev: z.string().optional().nullable(),
    })
    .transform((data) => ({
      first: data['first'],
      next: data['next'],
      prev: data['prev'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const linksRequest = z.lazy(() => {
  return z
    .object({
      first: z.string().optional(),
      next: z.string().optional().nullable(),
      prev: z.string().optional().nullable(),
    })
    .transform((data) => ({
      first: data['first'],
      next: data['next'],
      prev: data['prev'],
    }));
});
