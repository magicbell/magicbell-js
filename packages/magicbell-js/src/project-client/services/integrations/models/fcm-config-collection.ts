import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { FcmConfig, fcmConfig, fcmConfigRequest, fcmConfigResponse } from './fcm-config.js';

/**
 * Zod schema for the FcmConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const fcmConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(fcmConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {FcmConfigCollection} fcmConfigCollection
 * @property {FcmConfig[]}
 * @property {Links}
 */
export type FcmConfigCollection = z.infer<typeof fcmConfigCollection>;

/**
 * Zod schema for mapping API responses to the FcmConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the FcmConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
