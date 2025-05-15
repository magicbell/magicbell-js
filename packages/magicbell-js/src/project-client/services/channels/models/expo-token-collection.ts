import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ExpoToken, expoToken, expoTokenRequest, expoTokenResponse } from './expo-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(expoToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ExpoTokenCollection} expoTokenCollection
 * @property {ExpoToken[]}
 * @property {Links}
 */
export type ExpoTokenCollection = z.infer<typeof expoTokenCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(expoTokenResponse).optional(),
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
export const expoTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(expoTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
