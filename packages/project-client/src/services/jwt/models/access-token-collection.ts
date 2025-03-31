import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { AccessToken, accessToken, accessTokenRequest, accessTokenResponse } from './access-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const accessTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(accessToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {AccessTokenCollection} accessTokenCollection
 * @property {AccessToken[]}
 * @property {Links}
 */
export type AccessTokenCollection = z.infer<typeof accessTokenCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const accessTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(accessTokenResponse).optional(),
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
export const accessTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(accessTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
