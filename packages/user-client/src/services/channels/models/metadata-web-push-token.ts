import { z } from 'zod';

import { webPushToken, webPushTokenRequest, webPushTokenResponse } from '../../common/web-push-token.js';
import { tokenMetadata, tokenMetadataRequest, tokenMetadataResponse } from './token-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadataWebPushToken = z.lazy(() => {
  return z.object({
    data: webPushToken,
    metadata: tokenMetadata,
  });
});

/**
 *
 * @typedef  {MetadataWebPushToken} metadataWebPushToken
 * @property {WebPushToken}
 * @property {TokenMetadata}
 */
export type MetadataWebPushToken = z.infer<typeof metadataWebPushToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataWebPushTokenResponse = z.lazy(() => {
  return z
    .object({
      data: webPushTokenResponse,
      metadata: tokenMetadataResponse,
    })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataWebPushTokenRequest = z.lazy(() => {
  return z
    .object({ data: webPushTokenRequest.nullish(), metadata: tokenMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
