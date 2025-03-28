import { z } from 'zod';

import { expoTokenResponse1, expoTokenResponse1Request, expoTokenResponse1Response } from './expo-token-response-1.js';
import { links, linksRequest, linksResponse } from './links.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfExpoTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(expoTokenResponse1).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfExpoTokenResponses} arrayOfExpoTokenResponses
 * @property {ExpoTokenResponse1[]}
 * @property {Links}
 */
export type ArrayOfExpoTokenResponses = z.infer<typeof arrayOfExpoTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfExpoTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(expoTokenResponse1Response).optional(),
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
export const arrayOfExpoTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(expoTokenResponse1Request).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
