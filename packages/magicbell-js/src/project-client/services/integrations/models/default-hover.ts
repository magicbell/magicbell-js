import { z } from 'zod';

/**
 * Zod schema for the DefaultHover model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the DefaultHover application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the DefaultHover application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
