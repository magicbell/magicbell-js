import { z } from 'zod';

import { images, imagesRequest, imagesResponse } from './images';
import { theme, themeRequest, themeResponse } from './theme';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxConfig = z.lazy(() => {
  return z.object({
    images: images.nullable(),
    locale: z.string().min(2).nullable(),
    theme: theme.nullable(),
  });
});

/**
 *
 * @typedef  {InboxConfig} inboxConfig
 * @property {Images}
 * @property {string}
 * @property {Theme}
 */
export type InboxConfig = z.infer<typeof inboxConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigResponse = z.lazy(() => {
  return z
    .object({
      images: imagesResponse.nullable(),
      locale: z.string().min(2).nullable(),
      theme: themeResponse.nullable(),
    })
    .transform((data) => ({
      images: data['images'],
      locale: data['locale'],
      theme: data['theme'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigRequest = z.lazy(() => {
  return z
    .object({ images: imagesRequest.nullish(), locale: z.string().nullish(), theme: themeRequest.nullish() })
    .transform((data) => ({
      images: data['images'],
      locale: data['locale'],
      theme: data['theme'],
    }));
});
