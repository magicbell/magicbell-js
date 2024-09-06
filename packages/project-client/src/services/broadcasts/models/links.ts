import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const links = z.lazy(() => {
  return z.object({
    next: z.string().nullable(),
    prev: z.string().nullable(),
  });
});

/**
 *
 * @typedef  {Links} links
 * @property {string} - The cursor to the next page of results. If null, there are no more results.
 * @property {string} - The cursor to the previous page of results. If null, this is the first page.
 */
export type Links = z.infer<typeof links>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const linksResponse = z.lazy(() => {
  return z
    .object({
      next: z.string().nullable(),
      prev: z.string().nullable(),
    })
    .transform((data) => ({
      next: data['next'],
      prev: data['prev'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const linksRequest = z.lazy(() => {
  return z.object({ next: z.string().nullish(), prev: z.string().nullish() }).transform((data) => ({
    next: data['next'],
    prev: data['prev'],
  }));
});
