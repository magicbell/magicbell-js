import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  fetchTokensResponseToken,
  fetchTokensResponseTokenRequest,
  fetchTokensResponseTokenResponse,
} from './fetch-tokens-response-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfFetchTokensResponseTokens = z.lazy(() => {
  return z.object({
    data: z.array(fetchTokensResponseToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfFetchTokensResponseTokens} arrayOfFetchTokensResponseTokens
 * @property {FetchTokensResponseToken[]}
 * @property {Links}
 */
export type ArrayOfFetchTokensResponseTokens = z.infer<typeof arrayOfFetchTokensResponseTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfFetchTokensResponseTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(fetchTokensResponseTokenResponse).optional(),
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
export const arrayOfFetchTokensResponseTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(fetchTokensResponseTokenRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
