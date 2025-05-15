import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const unseenState = z.lazy(() => {
  return z.object({
    color: z.string(),
  });
});

/**
 *
 * @typedef  {UnseenState} unseenState
 * @property {string}
 */
export type UnseenState = z.infer<typeof unseenState>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenStateResponse = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenStateRequest = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});
