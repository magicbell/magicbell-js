import { z } from 'zod';

import { links, linksRequest, linksResponse } from './links.js';
import {
  teamsTokenResponse1,
  teamsTokenResponse1Request,
  teamsTokenResponse1Response,
} from './teams-token-response-1.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfTeamsTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(teamsTokenResponse1).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfTeamsTokenResponses} arrayOfTeamsTokenResponses
 * @property {TeamsTokenResponse1[]}
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
      data: z.array(teamsTokenResponse1Response).optional(),
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
    .object({ data: z.array(teamsTokenResponse1Request).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
