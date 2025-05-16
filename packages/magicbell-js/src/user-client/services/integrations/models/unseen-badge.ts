import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const unseenBadge = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
  });
});

/**
 *
 * @typedef  {UnseenBadge} unseenBadge
 * @property {string}
 */
export type UnseenBadge = z.infer<typeof unseenBadge>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenBadgeResponse = z.lazy(() => {
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
export const unseenBadgeRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});
