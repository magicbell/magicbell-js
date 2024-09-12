import { z } from 'zod';

import {
  arrayWithMetadataOfTeamsTokenData,
  arrayWithMetadataOfTeamsTokenDataRequest,
  arrayWithMetadataOfTeamsTokenDataResponse,
} from './array-with-metadata-of-teams-token-data.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfTeamsToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfTeamsTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfTeamsToken} arrayWithMetadataOfTeamsToken
 * @property {ArrayWithMetadataOfTeamsTokenData[]}
 */
export type ArrayWithMetadataOfTeamsToken = z.infer<typeof arrayWithMetadataOfTeamsToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfTeamsTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfTeamsTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfTeamsTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfTeamsTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
