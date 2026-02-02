import { z } from 'zod';

/**
 * Zod schema for the Dialog model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const dialog = z.lazy(() => {
  return z.object({
    accentColor: z.string(),
    backgroundColor: z.string(),
    textColor: z.string(),
  });
});

/**
 * Styling for confirmation and action dialogs.
 * @typedef  {Dialog} dialog - Styling for confirmation and action dialogs. - Styling for confirmation and action dialogs.
 * @property {string} - Accent color for dialog buttons and highlights.
 * @property {string} - Dialog background color.
 * @property {string} - Dialog text color.
 */
export type Dialog = z.infer<typeof dialog>;

/**
 * Zod schema for mapping API responses to the Dialog application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const dialogResponse = z.lazy(() => {
  return z
    .object({
      accentColor: z.string(),
      backgroundColor: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      accentColor: data['accentColor'],
      backgroundColor: data['backgroundColor'],
      textColor: data['textColor'],
    }));
});

/**
 * Zod schema for mapping the Dialog application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const dialogRequest = z.lazy(() => {
  return z
    .object({
      accentColor: z.string(),
      backgroundColor: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      accentColor: data['accentColor'],
      backgroundColor: data['backgroundColor'],
      textColor: data['textColor'],
    }));
});
