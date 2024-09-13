import { z } from 'zod';

import {
  arrayWithMetadataOfFcmTokenData,
  arrayWithMetadataOfFcmTokenDataRequest,
  arrayWithMetadataOfFcmTokenDataResponse,
} from './array-with-metadata-of-fcm-token-data.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfFcmToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfFcmTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfFcmToken} arrayWithMetadataOfFcmToken
 * @property {ArrayWithMetadataOfFcmTokenData[]}
 */
export type ArrayWithMetadataOfFcmToken = z.infer<typeof arrayWithMetadataOfFcmToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfFcmTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfFcmTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfFcmTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfFcmTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
