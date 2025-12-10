import { z } from 'zod';

import { Items, items, itemsRequest, itemsResponse } from './items.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
