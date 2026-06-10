import { z } from 'zod';

/**
 * Zod schema for the ExecuteWorkflowRequest model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {any} - Optional JSON payload that will be passed as the workflow input context.
 * @property {string} - The unique workflow key to execute (e.g. integration.stripe.charge.succeeded).
 */
export type ExecuteWorkflowRequest = z.infer<typeof executeWorkflowRequest>;

/**
 * Zod schema for mapping API responses to the ExecuteWorkflowRequest application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the ExecuteWorkflowRequest application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
