import { z } from 'zod';

import { expoToken, expoTokenRequest, expoTokenResponse } from './expo-token.js';
import {
  expoTokenWithMetadataMetadata,
  expoTokenWithMetadataMetadataRequest,
  expoTokenWithMetadataMetadataResponse,
} from './expo-token-with-metadata-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: expoToken,
    metadata: expoTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {ExpoTokenWithMetadata} expoTokenWithMetadata
 * @property {ExpoToken}
 * @property {ExpoTokenWithMetadataMetadata}
 */
export type ExpoTokenWithMetadata = z.infer<typeof expoTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: expoTokenResponse,
      metadata: expoTokenWithMetadataMetadataResponse,
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
export const expoTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: expoTokenRequest.nullish(), metadata: expoTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
