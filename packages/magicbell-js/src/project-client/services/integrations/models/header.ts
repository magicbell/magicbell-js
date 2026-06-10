import { z } from 'zod';

/**
 * Zod schema for the Header model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const header = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    borderRadius: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
    textColor: z.string(),
  });
});

/**
 * Header styling for the inbox modal.
 * @typedef  {Header} header - Header styling for the inbox modal. - Header styling for the inbox modal.
 * @property {string} - Header background color.
 * @property {string} - Border radius applied to the header container.
 * @property {string} - CSS font family for the header title.
 * @property {string} - Font size used in the header.
 * @property {string} - Header text color.
 */
export type Header = z.infer<typeof header>;

/**
 * Zod schema for mapping API responses to the Header application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const headerResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontFamily: z.string(),
      fontSize: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontFamily: data['fontFamily'],
      fontSize: data['fontSize'],
      textColor: data['textColor'],
    }));
});

/**
 * Zod schema for mapping the Header application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const headerRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontFamily: z.string(),
      fontSize: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontFamily: data['fontFamily'],
      fontSize: data['fontSize'],
      textColor: data['textColor'],
    }));
});
