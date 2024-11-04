import { z } from 'zod';

import { teamsToken, teamsTokenRequest, teamsTokenResponse } from './teams-token.js';
import { tokenMetadata, tokenMetadataRequest, tokenMetadataResponse } from './token-metadata.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadataTeamsToken = z.lazy(() => {
  return z.object({
    data: teamsToken,
    metadata: tokenMetadata,
  });
});

/**
 *
 * @typedef  {MetadataTeamsToken} metadataTeamsToken
 * @property {TeamsToken}
 * @property {TokenMetadata}
 */
export type MetadataTeamsToken = z.infer<typeof metadataTeamsToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataTeamsTokenResponse = z.lazy(() => {
  return z
    .object({
      data: teamsTokenResponse,
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
export const metadataTeamsTokenRequest = z.lazy(() => {
  return z
    .object({ data: teamsTokenRequest.nullish(), metadata: tokenMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
