import { z } from 'zod';

import {
  teamsTokenWithMetadataMetadata,
  teamsTokenWithMetadataMetadataRequest,
  teamsTokenWithMetadataMetadataResponse,
} from './teams-token-with-metadata-metadata';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsTokenWithMetadata = z.lazy(() => {
  return z.object({
    data: z.any(),
    metadata: teamsTokenWithMetadataMetadata,
  });
});

/**
 *
 * @typedef  {TeamsTokenWithMetadata} teamsTokenWithMetadata
 * @property {any}
 * @property {TeamsTokenWithMetadataMetadata}
 */
export type TeamsTokenWithMetadata = z.infer<typeof teamsTokenWithMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenWithMetadataResponse = z.lazy(() => {
  return z
    .object({
      data: z.any(),
      metadata: teamsTokenWithMetadataMetadataResponse,
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
export const teamsTokenWithMetadataRequest = z.lazy(() => {
  return z
    .object({ data: z.any().nullish(), metadata: teamsTokenWithMetadataMetadataRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      metadata: data['metadata'],
    }));
});
