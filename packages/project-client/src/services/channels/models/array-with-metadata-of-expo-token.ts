import { z } from 'zod';

import {
  arrayWithMetadataOfExpoTokenData,
  arrayWithMetadataOfExpoTokenDataRequest,
  arrayWithMetadataOfExpoTokenDataResponse,
} from './array-with-metadata-of-expo-token-data';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfExpoToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfExpoTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfExpoToken} arrayWithMetadataOfExpoToken
 * @property {ArrayWithMetadataOfExpoTokenData[]}
 */
export type ArrayWithMetadataOfExpoToken = z.infer<typeof arrayWithMetadataOfExpoToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfExpoTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfExpoTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfExpoTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfExpoTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
