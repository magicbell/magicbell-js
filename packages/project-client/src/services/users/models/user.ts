import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const user = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    customAttributes: z.any(),
    email: z.string().optional(),
    externalId: z.string().optional(),
    firstName: z.string().optional(),
    id: z.string(),
    lastName: z.string().optional(),
    lastNotifiedAt: z.string().optional(),
    lastSeenAt: z.string().optional(),
    phoneNumbers: z.array(z.string()).optional(),
    projectId: z.number(),
    updatedAt: z.string(),
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
 * @property {string[]}
 * @property {number}
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
      created_at: z.string(),
      custom_attributes: z.any(),
      email: z.string().optional(),
      external_id: z.string().optional(),
      first_name: z.string().optional(),
      id: z.string(),
      last_name: z.string().optional(),
      last_notified_at: z.string().optional(),
      last_seen_at: z.string().optional(),
      phone_numbers: z.array(z.string()).optional(),
      project_id: z.number(),
      updated_at: z.string(),
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
      phoneNumbers: data['phone_numbers'],
      projectId: data['project_id'],
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
      createdAt: z.string(),
      customAttributes: z.any(),
      email: z.string().optional(),
      externalId: z.string().optional(),
      firstName: z.string().optional(),
      id: z.string(),
      lastName: z.string().optional(),
      lastNotifiedAt: z.string().optional(),
      lastSeenAt: z.string().optional(),
      phoneNumbers: z.array(z.string()).optional(),
      projectId: z.number(),
      updatedAt: z.string(),
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
      phone_numbers: data['phoneNumbers'],
      project_id: data['projectId'],
      updated_at: data['updatedAt'],
    }));
});
