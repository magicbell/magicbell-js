import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { user, userRequest, userResponse } from './user.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfUsers = z.lazy(() => {
  return z.object({
    data: z.array(user).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfUsers} arrayOfUsers
 * @property {User[]}
 * @property {Links}
 */
export type ArrayOfUsers = z.infer<typeof arrayOfUsers>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfUsersResponse = z.lazy(() => {
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
export const arrayOfUsersRequest = z.lazy(() => {
  return z.object({ data: z.array(userRequest).optional(), links: linksRequest.optional() }).transform((data) => ({
    data: data['data'],
    links: data['links'],
  }));
});
