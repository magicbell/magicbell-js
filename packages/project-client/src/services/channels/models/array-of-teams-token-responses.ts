import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { teamsTokenResponse, teamsTokenResponseRequest, teamsTokenResponseResponse } from './teams-token-response.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfTeamsTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(teamsTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfTeamsTokenResponses} arrayOfTeamsTokenResponses
 * @property {TeamsTokenResponse[]}
 * @property {Links}
 */
export type ArrayOfTeamsTokenResponses = z.infer<typeof arrayOfTeamsTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfTeamsTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(teamsTokenResponseResponse).optional(),
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
export const arrayOfTeamsTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(teamsTokenResponseRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
