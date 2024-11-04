import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { metadataApnsToken, metadataApnsTokenRequest, metadataApnsTokenResponse } from './metadata-apns-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMetadataApnsTokens = z.lazy(() => {
  return z.object({
    data: z.array(metadataApnsToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMetadataApnsTokens} arrayOfMetadataApnsTokens
 * @property {MetadataApnsToken[]}
 * @property {Links}
 */
export type ArrayOfMetadataApnsTokens = z.infer<typeof arrayOfMetadataApnsTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMetadataApnsTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(metadataApnsTokenResponse).optional(),
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
export const arrayOfMetadataApnsTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(metadataApnsTokenRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
