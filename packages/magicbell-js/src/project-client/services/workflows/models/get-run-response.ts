import { z } from 'zod';

import {
  GetRunResponseStatus,
  getRunResponseStatus,
  getRunResponseStatusRequest,
  getRunResponseStatusResponse,
} from './get-run-response-status.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const getRunResponse = z.lazy(() => {
  return z.object({
    createdAt: z.string().optional(),
    id: z.string().optional(),
    status: getRunResponseStatus.optional(),
    workflowKey: z.string().optional(),
  });
});

/**
 *
 * @typedef  {GetRunResponse} getRunResponse
 * @property {string}
 * @property {string}
 * @property {GetRunResponseStatus}
 * @property {string}
 */
export type GetRunResponse = z.infer<typeof getRunResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const getRunResponseResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string().optional(),
      id: z.string().optional(),
      status: getRunResponseStatusResponse.optional(),
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
export const getRunResponseRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().optional(),
      id: z.string().optional(),
      status: getRunResponseStatusRequest.optional(),
      workflowKey: z.string().optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      id: data['id'],
      status: data['status'],
      workflow_key: data['workflowKey'],
    }));
});
