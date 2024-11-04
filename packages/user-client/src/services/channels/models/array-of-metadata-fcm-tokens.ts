import { z } from 'zod';

import { links, linksRequest, linksResponse } from './links.js';
import { metadataFcmToken, metadataFcmTokenRequest, metadataFcmTokenResponse } from './metadata-fcm-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMetadataFcmTokens = z.lazy(() => {
  return z.object({
    data: z.array(metadataFcmToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMetadataFcmTokens} arrayOfMetadataFcmTokens
 * @property {MetadataFcmToken[]}
 * @property {Links}
 */
export type ArrayOfMetadataFcmTokens = z.infer<typeof arrayOfMetadataFcmTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMetadataFcmTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(metadataFcmTokenResponse).optional(),
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
export const arrayOfMetadataFcmTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(metadataFcmTokenRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
