import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
