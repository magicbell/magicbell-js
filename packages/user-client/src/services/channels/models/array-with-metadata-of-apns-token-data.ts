import { z } from 'zod';

import { apnsToken, apnsTokenRequest, apnsTokenResponse } from './apns-token.js';
import { dataMetadata1, dataMetadata1Request, dataMetadata1Response } from './data-metadata-1.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfApnsTokenData = z.lazy(() => {
  return z.object({
    data: apnsToken,
    metadata: dataMetadata1,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfApnsTokenData} arrayWithMetadataOfApnsTokenData
 * @property {ApnsToken}
 * @property {DataMetadata1}
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
      metadata: dataMetadata1Response,
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
  return z.object({ data: apnsTokenRequest.nullish(), metadata: dataMetadata1Request.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
