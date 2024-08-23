import { z } from 'zod';

import { dataMetadata1, dataMetadata1Request, dataMetadata1Response } from './data-metadata-1';
import { inboxToken, inboxTokenRequest, inboxTokenResponse } from './inbox-token';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfInboxTokenData = z.lazy(() => {
  return z.object({
    data: inboxToken,
    metadata: dataMetadata1,
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfInboxTokenData} arrayWithMetadataOfInboxTokenData
 * @property {InboxToken}
 * @property {DataMetadata1}
 */
export type ArrayWithMetadataOfInboxTokenData = z.infer<typeof arrayWithMetadataOfInboxTokenData>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfInboxTokenDataResponse = z.lazy(() => {
  return z
    .object({
      data: inboxTokenResponse,
      metadata: dataMetadata1Response,
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
export const arrayWithMetadataOfInboxTokenDataRequest = z.lazy(() => {
  return z
    .object({ data: inboxTokenRequest.nullish(), metadata: dataMetadata1Request.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
