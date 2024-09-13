import { z } from 'zod';

import {
  arrayWithMetadataOfApnsTokenData,
  arrayWithMetadataOfApnsTokenDataRequest,
  arrayWithMetadataOfApnsTokenDataResponse,
} from './array-with-metadata-of-apns-token-data.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfApnsToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfApnsTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfApnsToken} arrayWithMetadataOfApnsToken
 * @property {ArrayWithMetadataOfApnsTokenData[]}
 */
export type ArrayWithMetadataOfApnsToken = z.infer<typeof arrayWithMetadataOfApnsToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfApnsTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfApnsTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfApnsTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfApnsTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
