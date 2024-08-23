import { z } from 'zod';

import { inboxToken, inboxTokenRequest, inboxTokenResponse } from './inbox-token';
import {
  inboxTokenWithMetadataMetadata,
  inboxTokenWithMetadataMetadataRequest,
  inboxTokenWithMetadataMetadataResponse,
} from './inbox-token-with-metadata-metadata';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: inboxToken,
    metadata: inboxTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {InboxTokenWithMetadata} inboxTokenWithMetadata
 * @property {InboxToken}
 * @property {InboxTokenWithMetadataMetadata}
 */
export type InboxTokenWithMetadata = z.infer<typeof inboxTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: inboxTokenResponse,
      metadata: inboxTokenWithMetadataMetadataResponse,
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
export const inboxTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: inboxTokenRequest.nullish(), metadata: inboxTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
