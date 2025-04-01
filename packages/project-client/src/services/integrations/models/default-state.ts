import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const defaultState = z.lazy(() => {
  return z.object({
    color: z.string(),
  });
});

/**
 *
 * @typedef  {DefaultState} defaultState
 * @property {string}
 */
export type DefaultState = z.infer<typeof defaultState>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const defaultStateResponse = z.lazy(() => {
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
export const defaultStateRequest = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});
