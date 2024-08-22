import { z } from 'zod';

import { fcmToken, fcmTokenRequest, fcmTokenResponse } from './fcm-token';
import {
  fcmTokenWithMetadataMetadata,
  fcmTokenWithMetadataMetadataRequest,
  fcmTokenWithMetadataMetadataResponse,
} from './fcm-token-with-metadata-metadata';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fcmTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: fcmToken,
    metadata: fcmTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {FcmTokenWithMetadata} fcmTokenWithMetadata
 * @property {FcmToken}
 * @property {FcmTokenWithMetadataMetadata}
 */
export type FcmTokenWithMetadata = z.infer<typeof fcmTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: fcmTokenResponse,
      metadata: fcmTokenWithMetadataMetadataResponse,
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
export const fcmTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: fcmTokenRequest.nullish(), metadata: fcmTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
