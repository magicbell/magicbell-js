import { z } from 'zod';

/**
 * Zod schema for the FcmToken model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const fcmToken = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    deviceToken: z.string().min(64),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {FcmToken} fcmToken
 * @property {string} - The timestamp when the token was created.
 * @property {string} - The Firebase Cloud Messaging device registration token to associate with the user.
 * @property {string} - The timestamp when the token was discarded, if applicable.
 * @property {string} - The unique identifier for the token.
 * @property {string} - The timestamp when the token metadata last changed.
 */
export type FcmToken = z.infer<typeof fcmToken>;

/**
 * Zod schema for mapping API responses to the FcmToken application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmTokenResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      device_token: z.string().min(64),
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
 * Zod schema for mapping the FcmToken application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      deviceToken: z.string().min(64),
      discardedAt: z.string().optional().nullable(),
      id: z.string(),
      updatedAt: z.string().optional().nullable(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      device_token: data['deviceToken'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      updated_at: data['updatedAt'],
    }));
});
