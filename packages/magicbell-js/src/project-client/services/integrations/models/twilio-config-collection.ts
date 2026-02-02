import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { TwilioConfig, twilioConfig, twilioConfigRequest, twilioConfigResponse } from './twilio-config.js';

/**
 * Zod schema for the TwilioConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the TwilioConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the TwilioConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
