import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { WebPushToken, webPushToken, webPushTokenRequest, webPushTokenResponse } from './web-push-token.js';

/**
 * Zod schema for the WebPushTokenCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const webPushTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(webPushToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {WebPushTokenCollection} webPushTokenCollection
 * @property {WebPushToken[]}
 * @property {Links}
 */
export type WebPushTokenCollection = z.infer<typeof webPushTokenCollection>;

/**
 * Zod schema for mapping API responses to the WebPushTokenCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(webPushTokenResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the WebPushTokenCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(webPushTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
