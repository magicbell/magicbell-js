import { z } from 'zod';

import { links, linksRequest, linksResponse } from './links.js';
import { metadataSlackToken, metadataSlackTokenRequest, metadataSlackTokenResponse } from './metadata-slack-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMetadataSlackTokens = z.lazy(() => {
  return z.object({
    data: z.array(metadataSlackToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMetadataSlackTokens} arrayOfMetadataSlackTokens
 * @property {MetadataSlackToken[]}
 * @property {Links}
 */
export type ArrayOfMetadataSlackTokens = z.infer<typeof arrayOfMetadataSlackTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMetadataSlackTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(metadataSlackTokenResponse).optional(),
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
export const arrayOfMetadataSlackTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(metadataSlackTokenRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
