import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const images = z.lazy(() => {
  return z.object({
    emptyInboxUrl: z.string(),
  });
});

/**
 * Image overrides for assets used in the inbox UI.
 * @typedef  {Images} images - Image overrides for assets used in the inbox UI. - Image overrides for assets used in the inbox UI.
 * @property {string} - URL for the illustration shown when the inbox is empty.
 */
export type Images = z.infer<typeof images>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const imagesResponse = z.lazy(() => {
  return z
    .object({
      emptyInboxUrl: z.string(),
    })
    .transform((data) => ({
      emptyInboxUrl: data['emptyInboxUrl'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const imagesRequest = z.lazy(() => {
  return z
    .object({
      emptyInboxUrl: z.string(),
    })
    .transform((data) => ({
      emptyInboxUrl: data['emptyInboxUrl'],
    }));
});
