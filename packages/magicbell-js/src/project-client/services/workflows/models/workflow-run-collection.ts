import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { WorkflowRun, workflowRun, workflowRunRequest, workflowRunResponse } from './workflow-run.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const workflowRunCollection = z.lazy(() => {
  return z.object({
    data: z.array(workflowRun).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {WorkflowRunCollection} workflowRunCollection
 * @property {WorkflowRun[]}
 * @property {Links}
 */
export type WorkflowRunCollection = z.infer<typeof workflowRunCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const workflowRunCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(workflowRunResponse).optional(),
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
export const workflowRunCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(workflowRunRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
