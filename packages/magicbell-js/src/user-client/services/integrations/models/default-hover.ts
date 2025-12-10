import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const defaultHover = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
  });
});

/**
 * Styles applied when a notification is hovered.
 * @typedef  {DefaultHover} defaultHover - Styles applied when a notification is hovered. - Styles applied when a notification is hovered.
 * @property {string} - Background color on hover.
 */
export type DefaultHover = z.infer<typeof defaultHover>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const defaultHoverResponse = z.lazy(() => {
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
export const defaultHoverRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});
