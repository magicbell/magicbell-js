import { z } from 'zod';

import { Items, items, itemsRequest, itemsResponse } from './items.js';

/**
 * Zod schema for the WorkflowList model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const workflowList = z.lazy(() => {
  return z.object({
    items: z.array(items).optional(),
  });
});

/**
 *
 * @typedef  {WorkflowList} workflowList
 * @property {Items[]}
 */
export type WorkflowList = z.infer<typeof workflowList>;

/**
 * Zod schema for mapping API responses to the WorkflowList application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowListResponse = z.lazy(() => {
  return z
    .object({
      items: z.array(itemsResponse).optional(),
    })
    .transform((data) => ({
      items: data['items'],
    }));
});

/**
 * Zod schema for mapping the WorkflowList application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowListRequest = z.lazy(() => {
  return z
    .object({
      items: z.array(itemsRequest).optional(),
    })
    .transform((data) => ({
      items: data['items'],
    }));
});
