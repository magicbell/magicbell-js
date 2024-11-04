import { z } from 'zod';

import { links, linksRequest, linksResponse } from './links.js';
import { metadataExpoToken, metadataExpoTokenRequest, metadataExpoTokenResponse } from './metadata-expo-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMetadataExpoTokens = z.lazy(() => {
  return z.object({
    data: z.array(metadataExpoToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMetadataExpoTokens} arrayOfMetadataExpoTokens
 * @property {MetadataExpoToken[]}
 * @property {Links}
 */
export type ArrayOfMetadataExpoTokens = z.infer<typeof arrayOfMetadataExpoTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMetadataExpoTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(metadataExpoTokenResponse).optional(),
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
export const arrayOfMetadataExpoTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(metadataExpoTokenRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
