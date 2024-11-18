import { z } from 'zod';

import { errors, errorsRequest, errorsResponse } from './errors.js';
import { summary, summaryRequest, summaryResponse } from './summary.js';

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
 *
 * @typedef  {BroadcastStatus} broadcastStatus
 * @property {Errors[]}
 * @property {StatusStatus}
 * @property {Summary}
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
      errors: z.array(errorsRequest).nullish(),
      status: z.string().nullish(),
      summary: summaryRequest.nullish(),
    })
    .transform((data) => ({
      errors: data['errors'],
      status: data['status'],
      summary: data['summary'],
    }));
});
