import { z } from 'zod';

import { expoToken, expoTokenRequest, expoTokenResponse } from './expo-token.js';
import { tokenMetadata, tokenMetadataRequest, tokenMetadataResponse } from './token-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadataExpoToken = z.lazy(() => {
  return z.object({
    data: expoToken,
    metadata: tokenMetadata,
  });
});

/**
 *
 * @typedef  {MetadataExpoToken} metadataExpoToken
 * @property {ExpoToken}
 * @property {TokenMetadata}
 */
export type MetadataExpoToken = z.infer<typeof metadataExpoToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataExpoTokenResponse = z.lazy(() => {
  return z
    .object({
      data: expoTokenResponse,
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
export const metadataExpoTokenRequest = z.lazy(() => {
  return z.object({ data: expoTokenRequest.nullish(), metadata: tokenMetadataRequest.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
