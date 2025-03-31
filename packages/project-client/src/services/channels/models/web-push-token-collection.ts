import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { WebPushToken, webPushToken, webPushTokenRequest, webPushTokenResponse } from './web-push-token.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
