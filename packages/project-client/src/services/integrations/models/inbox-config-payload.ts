import { z } from 'zod';

import { Images, images, imagesRequest, imagesResponse } from './images.js';
import { Theme, theme, themeRequest, themeResponse } from './theme.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxConfigPayload = z.lazy(() => {
  return z.object({
    images: images.nullable(),
    locale: z.string().min(2).nullable(),
    theme: theme.nullable(),
  });
});

/**
 *
 * @typedef  {InboxConfigPayload} inboxConfigPayload
 * @property {Images}
 * @property {string}
 * @property {Theme}
 */
export type InboxConfigPayload = z.infer<typeof inboxConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigPayloadResponse = z.lazy(() => {
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
export const inboxConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      images: imagesRequest.nullable(),
      locale: z.string().min(2).nullable(),
      theme: themeRequest.nullable(),
    })
    .transform((data) => ({
      images: data['images'],
      locale: data['locale'],
      theme: data['theme'],
    }));
});
