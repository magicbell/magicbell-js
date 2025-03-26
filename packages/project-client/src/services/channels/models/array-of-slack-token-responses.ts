import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { slackTokenResponse, slackTokenResponseRequest, slackTokenResponseResponse } from './slack-token-response.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfSlackTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(slackTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfSlackTokenResponses} arrayOfSlackTokenResponses
 * @property {SlackTokenResponse[]}
 * @property {Links}
 */
export type ArrayOfSlackTokenResponses = z.infer<typeof arrayOfSlackTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfSlackTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(slackTokenResponseResponse).optional(),
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
export const arrayOfSlackTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(slackTokenResponseRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
