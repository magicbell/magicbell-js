import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenWithMetadataMetadata = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional(),
    id: z.string(),
    updatedAt: z.string().optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenWithMetadataMetadata} slackTokenWithMetadataMetadata
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type SlackTokenWithMetadataMetadata = z.infer<typeof slackTokenWithMetadataMetadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenWithMetadataMetadataResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional(),
      id: z.string(),
      updated_at: z.string().optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      updatedAt: data['updated_at'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenWithMetadataMetadataRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().nullish(),
      discardedAt: z.string().nullish(),
      id: z.string().nullish(),
      updatedAt: z.string().nullish(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      updated_at: data['updatedAt'],
    }));
});
