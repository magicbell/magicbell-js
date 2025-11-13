import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const getRunResponseStatus = z.lazy(() => {
  return z.object({
    completedAt: z.string().optional(),
    error: z.string().optional(),
    nextStep: z.number().optional(),
    startedAt: z.string().optional(),
    state: z.number().optional(),
  });
});

/**
 *
 * @typedef  {GetRunResponseStatus} getRunResponseStatus
 * @property {string}
 * @property {string}
 * @property {number}
 * @property {string}
 * @property {number}
 */
export type GetRunResponseStatus = z.infer<typeof getRunResponseStatus>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const getRunResponseStatusResponse = z.lazy(() => {
  return z
    .object({
      completed_at: z.string().optional(),
      error: z.string().optional(),
      next_step: z.number().optional(),
      started_at: z.string().optional(),
      state: z.number().optional(),
    })
    .transform((data) => ({
      completedAt: data['completed_at'],
      error: data['error'],
      nextStep: data['next_step'],
      startedAt: data['started_at'],
      state: data['state'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const getRunResponseStatusRequest = z.lazy(() => {
  return z
    .object({
      completedAt: z.string().optional(),
      error: z.string().optional(),
      nextStep: z.number().optional(),
      startedAt: z.string().optional(),
      state: z.number().optional(),
    })
    .transform((data) => ({
      completed_at: data['completedAt'],
      error: data['error'],
      next_step: data['nextStep'],
      started_at: data['startedAt'],
      state: data['state'],
    }));
});
