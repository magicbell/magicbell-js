import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  InboxTokenResponse1,
  inboxTokenResponse1,
  inboxTokenResponse1Request,
  inboxTokenResponse1Response,
} from './inbox-token-response-1.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxTokenResponseCollection = z.lazy(() => {
  return z.object({
    data: z.array(inboxTokenResponse1).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {InboxTokenResponseCollection} inboxTokenResponseCollection
 * @property {InboxTokenResponse1[]}
 * @property {Links}
 */
export type InboxTokenResponseCollection = z.infer<typeof inboxTokenResponseCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenResponseCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxTokenResponse1Response).optional(),
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
export const inboxTokenResponseCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxTokenResponse1Request).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
