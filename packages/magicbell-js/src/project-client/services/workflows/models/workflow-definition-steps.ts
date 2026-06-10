import { z } from 'zod';

/**
 * Zod schema for the WorkflowDefinitionSteps model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const workflowDefinitionSteps = z.lazy(() => {
  return z.object({
    command: z.string().regex(/^[a-z_]+$/),
    if: z.string().optional().nullable(),
    input: z.any().optional().nullable(),
  });
});

/**
 *
 * @typedef  {WorkflowDefinitionSteps} workflowDefinitionSteps
 * @property {string} - Command to execute (e.g., broadcast, pause, wait, abort)
 * @property {string} - JMESPath condition that must evaluate truthy for the step to run.
 * @property {any} - Optional payload passed to the command when it executes.
 */
export type WorkflowDefinitionSteps = z.infer<typeof workflowDefinitionSteps>;

/**
 * Zod schema for mapping API responses to the WorkflowDefinitionSteps application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowDefinitionStepsResponse = z.lazy(() => {
  return z
    .object({
      command: z.string().regex(/^[a-z_]+$/),
      if: z.string().optional().nullable(),
      input: z.any().optional().nullable(),
    })
    .transform((data) => ({
      command: data['command'],
      if: data['if'],
      input: data['input'],
    }));
});

/**
 * Zod schema for mapping the WorkflowDefinitionSteps application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowDefinitionStepsRequest = z.lazy(() => {
  return z
    .object({
      command: z.string().regex(/^[a-z_]+$/),
      if: z.string().optional().nullable(),
      input: z.any().optional().nullable(),
    })
    .transform((data) => ({
      command: data['command'],
      if: data['if'],
      input: data['input'],
    }));
});
