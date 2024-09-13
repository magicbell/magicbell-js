import { z } from 'zod';

import { dataMetadata3, dataMetadata3Request, dataMetadata3Response } from './data-metadata-3.js';
import { fcmToken, fcmTokenRequest, fcmTokenResponse } from './fcm-token.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfFcmTokenData = z.lazy(() => {
  return z.object({
    data: fcmToken,
    metadata: dataMetadata3,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfFcmTokenData} arrayWithMetadataOfFcmTokenData
 * @property {FcmToken}
 * @property {DataMetadata3}
 */
export type ArrayWithMetadataOfFcmTokenData = z.infer<typeof arrayWithMetadataOfFcmTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfFcmTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: fcmTokenResponse,
      metadata: dataMetadata3Response,
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
export const arrayWithMetadataOfFcmTokenDataRequest = z.lazy(() => {
  return z.object({ data: fcmTokenRequest.nullish(), metadata: dataMetadata3Request.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
