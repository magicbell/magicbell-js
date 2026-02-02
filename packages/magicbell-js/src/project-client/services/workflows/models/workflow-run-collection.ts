import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { WorkflowRun, workflowRun, workflowRunRequest, workflowRunResponse } from './workflow-run.js';

/**
 * Zod schema for the WorkflowRunCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the WorkflowRunCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the WorkflowRunCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
