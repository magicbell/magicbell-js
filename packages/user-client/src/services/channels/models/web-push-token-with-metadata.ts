import { z } from 'zod';

import { webPushToken, webPushTokenRequest, webPushTokenResponse } from '../../common/web-push-token';
import {
  webPushTokenWithMetadataMetadata,
  webPushTokenWithMetadataMetadataRequest,
  webPushTokenWithMetadataMetadataResponse,
} from './web-push-token-with-metadata-metadata';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webPushTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: webPushToken,
    metadata: webPushTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {WebPushTokenWithMetadata} webPushTokenWithMetadata
 * @property {WebPushToken}
 * @property {WebPushTokenWithMetadataMetadata}
 */
export type WebPushTokenWithMetadata = z.infer<typeof webPushTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webPushTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: webPushTokenResponse,
      metadata: webPushTokenWithMetadataMetadataResponse,
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
export const webPushTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: webPushTokenRequest.nullish(), metadata: webPushTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
