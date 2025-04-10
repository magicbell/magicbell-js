import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const user = z.lazy(() => {
  return z.object({
    createdAt: z.string().optional(),
    customAttributes: z.any().optional(),
    email: z.string().optional(),
    externalId: z.string().optional(),
    firstName: z.string().optional(),
    id: z.string().optional(),
    lastName: z.string().optional(),
    lastNotifiedAt: z.string().optional(),
    lastSeenAt: z.string().optional(),
    updatedAt: z.string().optional(),
  });
});

/**
 *
 * @typedef  {User} user
 * @property {string}
 * @property {any}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type User = z.infer<typeof user>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const userResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string().optional(),
      custom_attributes: z.any().optional(),
      email: z.string().optional(),
      external_id: z.string().optional(),
      first_name: z.string().optional(),
      id: z.string().optional(),
      last_name: z.string().optional(),
      last_notified_at: z.string().optional(),
      last_seen_at: z.string().optional(),
      updated_at: z.string().optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      customAttributes: data['custom_attributes'],
      email: data['email'],
      externalId: data['external_id'],
      firstName: data['first_name'],
      id: data['id'],
      lastName: data['last_name'],
      lastNotifiedAt: data['last_notified_at'],
      lastSeenAt: data['last_seen_at'],
      updatedAt: data['updated_at'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const userRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().optional(),
      customAttributes: z.any().optional(),
      email: z.string().optional(),
      externalId: z.string().optional(),
      firstName: z.string().optional(),
      id: z.string().optional(),
      lastName: z.string().optional(),
      lastNotifiedAt: z.string().optional(),
      lastSeenAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      custom_attributes: data['customAttributes'],
      email: data['email'],
      external_id: data['externalId'],
      first_name: data['firstName'],
      id: data['id'],
      last_name: data['lastName'],
      last_notified_at: data['lastNotifiedAt'],
      last_seen_at: data['lastSeenAt'],
      updated_at: data['updatedAt'],
    }));
});
