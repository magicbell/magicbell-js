import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ApnsToken, apnsToken, apnsTokenRequest, apnsTokenResponse } from './apns-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(apnsToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ApnsTokenCollection} apnsTokenCollection
 * @property {ApnsToken[]}
 * @property {Links}
 */
export type ApnsTokenCollection = z.infer<typeof apnsTokenCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsTokenResponse).optional(),
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
export const apnsTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
