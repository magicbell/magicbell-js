import { z } from 'zod';

import { slackToken, slackTokenRequest, slackTokenResponse } from './slack-token';
import {
  slackTokenWithMetadataMetadata,
  slackTokenWithMetadataMetadataRequest,
  slackTokenWithMetadataMetadataResponse,
} from './slack-token-with-metadata-metadata';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: slackToken,
    metadata: slackTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {SlackTokenWithMetadata} slackTokenWithMetadata
 * @property {SlackToken}
 * @property {SlackTokenWithMetadataMetadata}
 */
export type SlackTokenWithMetadata = z.infer<typeof slackTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: slackTokenResponse,
      metadata: slackTokenWithMetadataMetadataResponse,
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
export const slackTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: slackTokenRequest.nullish(), metadata: slackTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
