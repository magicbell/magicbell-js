import { z } from 'zod';

import { fcmToken, fcmTokenRequest, fcmTokenResponse } from './fcm-token.js';
import { tokenMetadata, tokenMetadataRequest, tokenMetadataResponse } from './token-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadataFcmToken = z.lazy(() => {
  return z.object({
    data: fcmToken,
    metadata: tokenMetadata,
  });
});

/**
 *
 * @typedef  {MetadataFcmToken} metadataFcmToken
 * @property {FcmToken}
 * @property {TokenMetadata}
 */
export type MetadataFcmToken = z.infer<typeof metadataFcmToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataFcmTokenResponse = z.lazy(() => {
  return z
    .object({
      data: fcmTokenResponse,
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
export const metadataFcmTokenRequest = z.lazy(() => {
  return z.object({ data: fcmTokenRequest.nullish(), metadata: tokenMetadataRequest.nullish() }).transform((data) => ({
    data: data['data'],
    metadata: data['metadata'],
  }));
});
