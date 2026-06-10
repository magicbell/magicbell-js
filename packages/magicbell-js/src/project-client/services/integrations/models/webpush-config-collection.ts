import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { WebpushConfig, webpushConfig, webpushConfigRequest, webpushConfigResponse } from './webpush-config.js';

/**
 * Zod schema for the WebpushConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const webpushConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(webpushConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {WebpushConfigCollection} webpushConfigCollection
 * @property {WebpushConfig[]}
 * @property {Links}
 */
export type WebpushConfigCollection = z.infer<typeof webpushConfigCollection>;

/**
 * Zod schema for mapping API responses to the WebpushConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webpushConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(webpushConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the WebpushConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webpushConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(webpushConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
