import { z } from 'zod';

/**
 * Zod schema for the User model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const user = z.lazy(() => {
  return z.object({
    createdAt: z.string().optional().nullable(),
    customAttributes: z.any().optional().nullable(),
    email: z.string().optional().nullable(),
    externalId: z.string().optional().nullable(),
    firstName: z.string().optional().nullable(),
    id: z.string().optional(),
    lastName: z.string().optional().nullable(),
    lastNotifiedAt: z.string().optional().nullable(),
    lastSeenAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {User} user
 * @property {string} - The timestamp when the user was created.
 * @property {any} - Arbitrary custom values stored on the user.
 * @property {string} - The primary email address of the user.
 * @property {string} - The user identifier from an external system.
 * @property {string} - The first name of the user.
 * @property {string} - The unique identifier for the user.
 * @property {string} - The last name of the user.
 * @property {string} - The timestamp when the user last received a notification.
 * @property {string} - The timestamp when the user last opened the inbox.
 * @property {string} - The timestamp when the user was last updated.
 */
export type User = z.infer<typeof user>;

/**
 * Zod schema for mapping API responses to the User application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const userResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string().optional().nullable(),
      custom_attributes: z.any().optional().nullable(),
      email: z.string().optional().nullable(),
      external_id: z.string().optional().nullable(),
      first_name: z.string().optional().nullable(),
      id: z.string().optional(),
      last_name: z.string().optional().nullable(),
      last_notified_at: z.string().optional().nullable(),
      last_seen_at: z.string().optional().nullable(),
      updated_at: z.string().optional().nullable(),
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
 * Zod schema for mapping the User application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const userRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().optional().nullable(),
      customAttributes: z.any().optional().nullable(),
      email: z.string().optional().nullable(),
      externalId: z.string().optional().nullable(),
      firstName: z.string().optional().nullable(),
      id: z.string().optional(),
      lastName: z.string().optional().nullable(),
      lastNotifiedAt: z.string().optional().nullable(),
      lastSeenAt: z.string().optional().nullable(),
      updatedAt: z.string().optional().nullable(),
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
