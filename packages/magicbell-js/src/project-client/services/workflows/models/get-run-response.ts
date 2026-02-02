import { z } from 'zod';

import {
  GetRunResponseStatus,
  getRunResponseStatus,
  getRunResponseStatusRequest,
  getRunResponseStatusResponse,
} from './get-run-response-status.js';

/**
 * Zod schema for the GetRunResponse model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const getRunResponse = z.lazy(() => {
  return z.object({
    createdAt: z.string().optional(),
    id: z.string().optional(),
    input: z.any().optional(),
    status: getRunResponseStatus.optional(),
    workflowKey: z.string().optional(),
  });
});

/**
 *
 * @typedef  {GetRunResponse} getRunResponse
 * @property {string}
 * @property {string}
 * @property {any}
 * @property {GetRunResponseStatus}
 * @property {string}
 */
export type GetRunResponse = z.infer<typeof getRunResponse>;

/**
 * Zod schema for mapping API responses to the GetRunResponse application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const getRunResponseResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string().optional(),
      id: z.string().optional(),
      input: z.any().optional(),
      status: getRunResponseStatusResponse.optional(),
      workflow_key: z.string().optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      id: data['id'],
      input: data['input'],
      status: data['status'],
      workflowKey: data['workflow_key'],
    }));
});

/**
 * Zod schema for mapping the GetRunResponse application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const getRunResponseRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().optional(),
      id: z.string().optional(),
      input: z.any().optional(),
      status: getRunResponseStatusRequest.optional(),
      workflowKey: z.string().optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      id: data['id'],
      input: data['input'],
      status: data['status'],
      workflow_key: data['workflowKey'],
    }));
});
