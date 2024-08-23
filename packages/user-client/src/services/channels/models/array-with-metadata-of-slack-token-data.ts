import { z } from 'zod';

import { dataMetadata4, dataMetadata4Request, dataMetadata4Response } from './data-metadata-4';
import { slackToken, slackTokenRequest, slackTokenResponse } from './slack-token';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfSlackTokenData = z.lazy(() => {
  return z.object({
    data: slackToken,
    metadata: dataMetadata4,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfSlackTokenData} arrayWithMetadataOfSlackTokenData
 * @property {SlackToken}
 * @property {DataMetadata4}
 */
export type ArrayWithMetadataOfSlackTokenData = z.infer<typeof arrayWithMetadataOfSlackTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfSlackTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: slackTokenResponse,
      metadata: dataMetadata4Response,
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
export const arrayWithMetadataOfSlackTokenDataRequest = z.lazy(() => {
  return z
    .object({ data: slackTokenRequest.nullish(), metadata: dataMetadata4Request.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
