import { z } from 'zod';

import { webPushToken, webPushTokenRequest, webPushTokenResponse } from '../../common/web-push-token';
import { dataMetadata6, dataMetadata6Request, dataMetadata6Response } from './data-metadata-6';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfWebPushTokenData = z.lazy(() => {
  return z.object({
    data: webPushToken,
    metadata: dataMetadata6,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfWebPushTokenData} arrayWithMetadataOfWebPushTokenData
 * @property {WebPushToken}
 * @property {DataMetadata6}
 */
export type ArrayWithMetadataOfWebPushTokenData = z.infer<typeof arrayWithMetadataOfWebPushTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfWebPushTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: webPushTokenResponse,
      metadata: dataMetadata6Response,
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
export const arrayWithMetadataOfWebPushTokenDataRequest = z.lazy(() => {
  return z
    .object({ data: webPushTokenRequest.nullish(), metadata: dataMetadata6Request.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
