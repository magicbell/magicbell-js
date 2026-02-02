import { z } from 'zod';

import { Errors, errors, errorsRequest, errorsResponse } from './errors.js';
import { Summary, summary, summaryRequest, summaryResponse } from './summary.js';

/**
 * Zod schema for the BroadcastStatus model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const broadcastStatus = z.lazy(() => {
  return z.object({
    errors: z.array(errors).nullable(),
    status: z.string(),
    summary: summary,
  });
});

/**
 * The runtime state of the broadcast execution.
 * @typedef  {BroadcastStatus} broadcastStatus - The runtime state of the broadcast execution. - The runtime state of the broadcast execution.
 * @property {Errors[]} - A list of errors encountered while processing the broadcast.
 * @property {StatusStatus} - The overall processing status of the broadcast.
 * @property {Summary} - The summary counts for total recipients and failures.
 */
export type BroadcastStatus = z.infer<typeof broadcastStatus>;

/**
 * Zod schema for mapping API responses to the BroadcastStatus application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const broadcastStatusResponse = z.lazy(() => {
  return z
    .object({
      errors: z.array(errorsResponse).nullable(),
      status: z.string(),
      summary: summaryResponse,
    })
    .transform((data) => ({
      errors: data['errors'],
      status: data['status'],
      summary: data['summary'],
    }));
});

/**
 * Zod schema for mapping the BroadcastStatus application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const broadcastStatusRequest = z.lazy(() => {
  return z
    .object({
      errors: z.array(errorsRequest).nullable(),
      status: z.string(),
      summary: summaryRequest,
    })
    .transform((data) => ({
      errors: data['errors'],
      status: data['status'],
      summary: data['summary'],
    }));
});
