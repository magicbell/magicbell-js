import { z } from 'zod';

import { dataMetadata5, dataMetadata5Request, dataMetadata5Response } from './data-metadata-5';
import { teamsToken, teamsTokenRequest, teamsTokenResponse } from './teams-token';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfTeamsTokenData = z.lazy(() => {
  return z.object({
    data: teamsToken,
    metadata: dataMetadata5,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfTeamsTokenData} arrayWithMetadataOfTeamsTokenData
 * @property {TeamsToken}
 * @property {DataMetadata5}
 */
export type ArrayWithMetadataOfTeamsTokenData = z.infer<typeof arrayWithMetadataOfTeamsTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfTeamsTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: teamsTokenResponse,
      metadata: dataMetadata5Response,
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
export const arrayWithMetadataOfTeamsTokenDataRequest = z.lazy(() => {
  return z
    .object({ data: teamsTokenRequest.nullish(), metadata: dataMetadata5Request.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
