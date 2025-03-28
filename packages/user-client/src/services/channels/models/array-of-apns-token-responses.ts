import { z } from 'zod';

import { apnsTokenResponse1, apnsTokenResponse1Request, apnsTokenResponse1Response } from './apns-token-response-1.js';
import { links, linksRequest, linksResponse } from './links.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfApnsTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(apnsTokenResponse1).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfApnsTokenResponses} arrayOfApnsTokenResponses
 * @property {ApnsTokenResponse1[]}
 * @property {Links}
 */
export type ArrayOfApnsTokenResponses = z.infer<typeof arrayOfApnsTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfApnsTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsTokenResponse1Response).optional(),
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
export const arrayOfApnsTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(apnsTokenResponse1Request).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
