import { z } from 'zod';

import {
  WorkflowRunStatus,
  workflowRunStatus,
  workflowRunStatusRequest,
  workflowRunStatusResponse,
} from './workflow-run-status.js';

/**
 * Zod schema for the WorkflowRun model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const workflowRun = z.lazy(() => {
  return z.object({
    createdAt: z.string().optional(),
    id: z.string().optional(),
    status: workflowRunStatus.optional(),
    workflowKey: z.string().optional(),
  });
});

/**
 *
 * @typedef  {WorkflowRun} workflowRun
 * @property {string}
 * @property {string}
 * @property {WorkflowRunStatus}
 * @property {string}
 */
export type WorkflowRun = z.infer<typeof workflowRun>;

/**
 * Zod schema for mapping API responses to the WorkflowRun application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowRunResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string().optional(),
      id: z.string().optional(),
      status: workflowRunStatusResponse.optional(),
      workflow_key: z.string().optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      id: data['id'],
      status: data['status'],
      workflowKey: data['workflow_key'],
    }));
});

/**
 * Zod schema for mapping the WorkflowRun application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowRunRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().optional(),
      id: z.string().optional(),
      status: workflowRunStatusRequest.optional(),
      workflowKey: z.string().optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      id: data['id'],
      status: data['status'],
      workflow_key: data['workflowKey'],
    }));
});
