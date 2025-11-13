import { z } from 'zod';

import {
  WorkflowRunStatus,
  workflowRunStatus,
  workflowRunStatusRequest,
  workflowRunStatusResponse,
} from './workflow-run-status.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
