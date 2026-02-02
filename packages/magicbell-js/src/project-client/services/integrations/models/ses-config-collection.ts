import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SesConfig, sesConfig, sesConfigRequest, sesConfigResponse } from './ses-config.js';

/**
 * Zod schema for the SesConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const sesConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(sesConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SesConfigCollection} sesConfigCollection
 * @property {SesConfig[]}
 * @property {Links}
 */
export type SesConfigCollection = z.infer<typeof sesConfigCollection>;

/**
 * Zod schema for mapping API responses to the SesConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sesConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(sesConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the SesConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sesConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(sesConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
