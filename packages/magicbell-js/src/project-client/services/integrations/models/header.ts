import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 *
 * @typedef  {Header} header
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Header = z.infer<typeof header>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
