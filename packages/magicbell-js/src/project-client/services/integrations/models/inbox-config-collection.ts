import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { InboxConfig, inboxConfig, inboxConfigRequest, inboxConfigResponse } from './inbox-config.js';

/**
 * Zod schema for the InboxConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the InboxConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the InboxConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
