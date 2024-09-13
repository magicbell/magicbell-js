import { z } from 'zod';

import { dataMetadata2, dataMetadata2Request, dataMetadata2Response } from './data-metadata-2.js';
import { expoToken, expoTokenRequest, expoTokenResponse } from './expo-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfExpoTokenData = z.lazy(() => {
  return z.object({
    data: expoToken,
    metadata: dataMetadata2,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfExpoTokenData} arrayWithMetadataOfExpoTokenData
 * @property {ExpoToken}
 * @property {DataMetadata2}
 */
export type ArrayWithMetadataOfExpoTokenData = z.infer<typeof arrayWithMetadataOfExpoTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfExpoTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: expoTokenResponse,
      metadata: dataMetadata2Response,
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
export const arrayWithMetadataOfExpoTokenDataRequest = z.lazy(() => {
  return z.object({ data: expoTokenRequest.nullish(), metadata: dataMetadata2Request.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
