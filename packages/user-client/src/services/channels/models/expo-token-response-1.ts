import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoTokenResponse1 = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    deviceToken: z.string().min(1),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {ExpoTokenResponse1} expoTokenResponse1
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type ExpoTokenResponse1 = z.infer<typeof expoTokenResponse1>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenResponse1Response = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      device_token: z.string().min(1),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      updated_at: z.string().optional().nullable(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      deviceToken: data['device_token'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      updatedAt: data['updated_at'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const expoTokenResponse1Request = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      deviceToken: z.string(),
      discardedAt: z.string().nullable().optional(),
      id: z.string(),
      updatedAt: z.string().nullable().optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      device_token: data['deviceToken'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      updated_at: data['updatedAt'],
    }));
});
