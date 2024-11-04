import { z } from 'zod';

import { slackToken, slackTokenRequest, slackTokenResponse } from './slack-token.js';
import { tokenMetadata, tokenMetadataRequest, tokenMetadataResponse } from './token-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadataSlackToken = z.lazy(() => {
  return z.object({
    data: slackToken,
    metadata: tokenMetadata,
  });
});

/**
 *
 * @typedef  {MetadataSlackToken} metadataSlackToken
 * @property {SlackToken}
 * @property {TokenMetadata}
 */
export type MetadataSlackToken = z.infer<typeof metadataSlackToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataSlackTokenResponse = z.lazy(() => {
  return z
    .object({
      data: slackTokenResponse,
      metadata: tokenMetadataResponse,
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
export const metadataSlackTokenRequest = z.lazy(() => {
  return z
    .object({ data: slackTokenRequest.nullish(), metadata: tokenMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
