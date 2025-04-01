import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { TeamsToken, teamsToken, teamsTokenRequest, teamsTokenResponse } from './teams-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(teamsToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {TeamsTokenCollection} teamsTokenCollection
 * @property {TeamsToken[]}
 * @property {Links}
 */
export type TeamsTokenCollection = z.infer<typeof teamsTokenCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(teamsTokenResponse).optional(),
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
export const teamsTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(teamsTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
