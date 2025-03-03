import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { inboxConfigObject, inboxConfigObjectRequest, inboxConfigObjectResponse } from './inbox-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfInboxConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(inboxConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfInboxConfigObjects} arrayOfInboxConfigObjects
 * @property {InboxConfigObject[]}
 * @property {Links}
 */
export type ArrayOfInboxConfigObjects = z.infer<typeof arrayOfInboxConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfInboxConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxConfigObjectResponse).optional(),
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
export const arrayOfInboxConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(inboxConfigObjectRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
