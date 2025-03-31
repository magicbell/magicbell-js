import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SlackToken, slackToken, slackTokenRequest, slackTokenResponse } from './slack-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(slackToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenCollection} slackTokenCollection
 * @property {SlackToken[]}
 * @property {Links}
 */
export type SlackTokenCollection = z.infer<typeof slackTokenCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(slackTokenResponse).optional(),
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
export const slackTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(slackTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
