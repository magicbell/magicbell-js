import { z } from 'zod';

import { apnsToken, apnsTokenRequest, apnsTokenResponse } from './apns-token';
import { dataMetadata2, dataMetadata2Request, dataMetadata2Response } from './data-metadata-2';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfApnsTokenData = z.lazy(() => {
  return z.object({
    data: apnsToken,
    metadata: dataMetadata2,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfApnsTokenData} arrayWithMetadataOfApnsTokenData
 * @property {ApnsToken}
 * @property {DataMetadata2}
 */
export type ArrayWithMetadataOfApnsTokenData = z.infer<typeof arrayWithMetadataOfApnsTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfApnsTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: apnsTokenResponse,
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
export const arrayWithMetadataOfApnsTokenDataRequest = z.lazy(() => {
  return z.object({ data: apnsTokenRequest.nullish(), metadata: dataMetadata2Request.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
