import { z } from 'zod';

/**
 * Zod schema for the DefaultState model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const defaultState = z.lazy(() => {
  return z.object({
    color: z.string(),
  });
});

/**
 * Accent colors for notification state indicators.
 * @typedef  {DefaultState} defaultState - Accent colors for notification state indicators. - Accent colors for notification state indicators.
 * @property {string} - Color used for the state indicator.
 */
export type DefaultState = z.infer<typeof defaultState>;

/**
 * Zod schema for mapping API responses to the DefaultState application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the DefaultState application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
