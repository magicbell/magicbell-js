import { z } from 'zod';

/**
 * Zod schema for the GetRunResponseStatus model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the GetRunResponseStatus application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the GetRunResponseStatus application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
