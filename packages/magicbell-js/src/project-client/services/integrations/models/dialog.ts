import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
