import { z } from 'zod';

import { apnsToken, apnsTokenRequest, apnsTokenResponse } from './apns-token';
import {
  apnsTokenWithMetadataMetadata,
  apnsTokenWithMetadataMetadataRequest,
  apnsTokenWithMetadataMetadataResponse,
} from './apns-token-with-metadata-metadata';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: apnsToken,
    metadata: apnsTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {ApnsTokenWithMetadata} apnsTokenWithMetadata
 * @property {ApnsToken}
 * @property {ApnsTokenWithMetadataMetadata}
 */
export type ApnsTokenWithMetadata = z.infer<typeof apnsTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: apnsTokenResponse,
      metadata: apnsTokenWithMetadataMetadataResponse,
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
export const apnsTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: apnsTokenRequest.nullish(), metadata: apnsTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
