import { z } from 'zod';

import { Errors, errors, errorsRequest, errorsResponse } from './errors.js';
import { Summary, summary, summaryRequest, summaryResponse } from './summary.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
