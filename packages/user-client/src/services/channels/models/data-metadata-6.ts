import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const dataMetadata6 = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional(),
    id: z.string(),
    updatedAt: z.string().optional(),
  });
});

/**
 *
 * @typedef  {DataMetadata6} dataMetadata6
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type DataMetadata6 = z.infer<typeof dataMetadata6>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const dataMetadata6Response = z.lazy(() => {
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
export const dataMetadata6Request = z.lazy(() => {
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
