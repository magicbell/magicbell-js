import { z } from 'zod';

import {
  arrayWithMetadataOfSlackTokenData,
  arrayWithMetadataOfSlackTokenDataRequest,
  arrayWithMetadataOfSlackTokenDataResponse,
} from './array-with-metadata-of-slack-token-data.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfSlackToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfSlackTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfSlackToken} arrayWithMetadataOfSlackToken
 * @property {ArrayWithMetadataOfSlackTokenData[]}
 */
export type ArrayWithMetadataOfSlackToken = z.infer<typeof arrayWithMetadataOfSlackToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfSlackTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfSlackTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfSlackTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfSlackTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
