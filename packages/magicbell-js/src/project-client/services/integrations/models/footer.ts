import { z } from 'zod';

/**
 * Zod schema for the Footer model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const footer = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    borderRadius: z.string(),
    fontSize: z.string(),
    textColor: z.string(),
  });
});

/**
 * Footer styling for the inbox modal.
 * @typedef  {Footer} footer - Footer styling for the inbox modal. - Footer styling for the inbox modal.
 * @property {string} - Footer background color.
 * @property {string} - Border radius applied to the footer container.
 * @property {string} - Font size used in the footer.
 * @property {string} - Footer text color.
 */
export type Footer = z.infer<typeof footer>;

/**
 * Zod schema for mapping API responses to the Footer application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const footerResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontSize: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontSize: data['fontSize'],
      textColor: data['textColor'],
    }));
});

/**
 * Zod schema for mapping the Footer application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const footerRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontSize: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontSize: data['fontSize'],
      textColor: data['textColor'],
    }));
});
