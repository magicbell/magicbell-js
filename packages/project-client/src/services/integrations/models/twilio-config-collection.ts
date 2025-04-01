import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { TwilioConfig, twilioConfig, twilioConfigRequest, twilioConfigResponse } from './twilio-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const twilioConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(twilioConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {TwilioConfigCollection} twilioConfigCollection
 * @property {TwilioConfig[]}
 * @property {Links}
 */
export type TwilioConfigCollection = z.infer<typeof twilioConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const twilioConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(twilioConfigResponse).optional(),
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
export const twilioConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(twilioConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
