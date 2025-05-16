import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { InboxConfig, inboxConfig, inboxConfigRequest, inboxConfigResponse } from './inbox-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(inboxConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {InboxConfigCollection} inboxConfigCollection
 * @property {InboxConfig[]}
 * @property {Links}
 */
export type InboxConfigCollection = z.infer<typeof inboxConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxConfigResponse).optional(),
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
export const inboxConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
