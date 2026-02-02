import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  InboxTokenResponse,
  inboxTokenResponse,
  inboxTokenResponseRequest,
  inboxTokenResponseResponse,
} from './inbox-token-response.js';

/**
 * Zod schema for the InboxTokenResponseCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const inboxTokenResponseCollection = z.lazy(() => {
  return z.object({
    data: z.array(inboxTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {InboxTokenResponseCollection} inboxTokenResponseCollection
 * @property {InboxTokenResponse[]}
 * @property {Links}
 */
export type InboxTokenResponseCollection = z.infer<typeof inboxTokenResponseCollection>;

/**
 * Zod schema for mapping API responses to the InboxTokenResponseCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const inboxTokenResponseCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxTokenResponseResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the InboxTokenResponseCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const inboxTokenResponseCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(inboxTokenResponseRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
