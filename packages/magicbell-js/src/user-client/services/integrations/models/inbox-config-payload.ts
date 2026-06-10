import { z } from 'zod';

import { Images, images, imagesRequest, imagesResponse } from './images.js';
import { Theme, theme, themeRequest, themeResponse } from './theme.js';

/**
 * Zod schema for the InboxConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {Images} - Image overrides for assets used in the inbox UI.
 * @property {string} - Locale code (ISO language tag) used to localize built-in strings.
 * @property {Theme} - Visual customization options for the hosted inbox widget.
 */
export type InboxConfigPayload = z.infer<typeof inboxConfigPayload>;

/**
 * Zod schema for mapping API responses to the InboxConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the InboxConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
