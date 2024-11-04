import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  metadataWebPushToken,
  metadataWebPushTokenRequest,
  metadataWebPushTokenResponse,
} from './metadata-web-push-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMetadataWebPushTokens = z.lazy(() => {
  return z.object({
    data: z.array(metadataWebPushToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMetadataWebPushTokens} arrayOfMetadataWebPushTokens
 * @property {MetadataWebPushToken[]}
 * @property {Links}
 */
export type ArrayOfMetadataWebPushTokens = z.infer<typeof arrayOfMetadataWebPushTokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMetadataWebPushTokensResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(metadataWebPushTokenResponse).optional(),
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
export const arrayOfMetadataWebPushTokensRequest = z.lazy(() => {
  return z
    .object({ data: z.array(metadataWebPushTokenRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
