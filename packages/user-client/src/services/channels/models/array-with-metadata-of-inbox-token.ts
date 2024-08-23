import { z } from 'zod';

import {
  arrayWithMetadataOfInboxTokenData,
  arrayWithMetadataOfInboxTokenDataRequest,
  arrayWithMetadataOfInboxTokenDataResponse,
} from './array-with-metadata-of-inbox-token-data';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfInboxToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfInboxTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfInboxToken} arrayWithMetadataOfInboxToken
 * @property {ArrayWithMetadataOfInboxTokenData[]}
 */
export type ArrayWithMetadataOfInboxToken = z.infer<typeof arrayWithMetadataOfInboxToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfInboxTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfInboxTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfInboxTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfInboxTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
