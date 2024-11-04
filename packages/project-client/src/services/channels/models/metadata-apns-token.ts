import { z } from 'zod';

import { apnsToken, apnsTokenRequest, apnsTokenResponse } from './apns-token.js';
import { tokenMetadata, tokenMetadataRequest, tokenMetadataResponse } from './token-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadataApnsToken = z.lazy(() => {
  return z.object({
    data: apnsToken,
    metadata: tokenMetadata,
  });
});

/**
 *
 * @typedef  {MetadataApnsToken} metadataApnsToken
 * @property {ApnsToken}
 * @property {TokenMetadata}
 */
export type MetadataApnsToken = z.infer<typeof metadataApnsToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataApnsTokenResponse = z.lazy(() => {
  return z
    .object({
      data: apnsTokenResponse,
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
export const metadataApnsTokenRequest = z.lazy(() => {
  return z.object({ data: apnsTokenRequest.nullish(), metadata: tokenMetadataRequest.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
