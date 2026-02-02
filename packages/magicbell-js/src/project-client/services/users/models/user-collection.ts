import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { User, user, userRequest, userResponse } from '../../common/user.js';

/**
 * Zod schema for the UserCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const userCollection = z.lazy(() => {
  return z.object({
    data: z.array(user).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {UserCollection} userCollection
 * @property {User[]}
 * @property {Links}
 */
export type UserCollection = z.infer<typeof userCollection>;

/**
 * Zod schema for mapping API responses to the UserCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const userCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(userResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the UserCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const userCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(userRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
