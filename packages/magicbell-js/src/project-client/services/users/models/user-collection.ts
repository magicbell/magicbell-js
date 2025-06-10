import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { User, user, userRequest, userResponse } from '../../common/user.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
