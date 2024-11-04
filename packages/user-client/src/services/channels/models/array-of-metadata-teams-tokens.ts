import { z } from 'zod';

import { links, linksRequest, linksResponse } from './links.js';
import { metadataTeamsToken, metadataTeamsTokenRequest, metadataTeamsTokenResponse } from './metadata-teams-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMetadataTeamsTokens = z.lazy(() => {
  return z.object({
    data: z.array(metadataTeamsToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMetadataTeamsTokens} arrayOfMetadataTeamsTokens
 * @property {MetadataTeamsToken[]}
 * @property {Links}
 */
export type ArrayOfMetadataTeamsTokens = z.infer<typeof arrayOfMetadataTeamsTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMetadataTeamsTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(metadataTeamsTokenResponse).optional(),
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
export const arrayOfMetadataTeamsTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(metadataTeamsTokenRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
