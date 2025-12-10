import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
