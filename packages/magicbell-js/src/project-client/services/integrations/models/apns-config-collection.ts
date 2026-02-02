import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ApnsConfig, apnsConfig, apnsConfigRequest, apnsConfigResponse } from './apns-config.js';

/**
 * Zod schema for the ApnsConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const apnsConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(apnsConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ApnsConfigCollection} apnsConfigCollection
 * @property {ApnsConfig[]}
 * @property {Links}
 */
export type ApnsConfigCollection = z.infer<typeof apnsConfigCollection>;

/**
 * Zod schema for mapping API responses to the ApnsConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the ApnsConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
