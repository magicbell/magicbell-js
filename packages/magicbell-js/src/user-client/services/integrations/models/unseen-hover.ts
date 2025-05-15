import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const unseenHover = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
  });
});

/**
 *
 * @typedef  {UnseenHover} unseenHover
 * @property {string}
 */
export type UnseenHover = z.infer<typeof unseenHover>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenHoverResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenHoverRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});
