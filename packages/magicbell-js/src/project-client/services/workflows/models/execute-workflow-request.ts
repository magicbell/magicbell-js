import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const executeWorkflowRequest = z.lazy(() => {
  return z.object({
    input: z.any().optional().nullable(),
    key: z.string().regex(/^[A-Za-z0-9\_\.\-\:]+$/),
  });
});

/**
 *
 * @typedef  {ExecuteWorkflowRequest} executeWorkflowRequest
 * @property {any}
 * @property {string}
 */
export type ExecuteWorkflowRequest = z.infer<typeof executeWorkflowRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const executeWorkflowRequestResponse = z.lazy(() => {
  return z
    .object({
      input: z.any().optional().nullable(),
      key: z.string().regex(/^[A-Za-z0-9\_\.\-\:]+$/),
    })
    .transform((data) => ({
      input: data['input'],
      key: data['key'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const executeWorkflowRequestRequest = z.lazy(() => {
  return z
    .object({
      input: z.any().optional().nullable(),
      key: z.string().regex(/^[A-Za-z0-9\_\.\-\:]+$/),
    })
    .transform((data) => ({
      input: data['input'],
      key: data['key'],
    }));
});
