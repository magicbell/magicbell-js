import { z } from 'zod';

import {
  WorkflowDefinitionSteps,
  workflowDefinitionSteps,
  workflowDefinitionStepsRequest,
  workflowDefinitionStepsResponse,
} from './workflow-definition-steps.js';

/**
 * Zod schema for the WorkflowDefinition model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const workflowDefinition = z.lazy(() => {
  return z.object({
    disabled: z.boolean().optional(),
    key: z
      .string()
      .min(3)
      .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
    steps: z.array(workflowDefinitionSteps),
  });
});

/**
 *
 * @typedef  {WorkflowDefinition} workflowDefinition
 * @property {boolean} - When true, prevents the workflow from being triggered.
 * @property {string} - Unique identifier for this workflow definition.
 * @property {WorkflowDefinitionSteps[]} - Ordered list describing each action that will run inside the workflow.
 */
export type WorkflowDefinition = z.infer<typeof workflowDefinition>;

/**
 * Zod schema for mapping API responses to the WorkflowDefinition application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowDefinitionResponse = z.lazy(() => {
  return z
    .object({
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
      steps: z.array(workflowDefinitionStepsResponse),
    })
    .transform((data) => ({
      disabled: data['disabled'],
      key: data['key'],
      steps: data['steps'],
    }));
});

/**
 * Zod schema for mapping the WorkflowDefinition application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const workflowDefinitionRequest = z.lazy(() => {
  return z
    .object({
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
      steps: z.array(workflowDefinitionStepsRequest),
    })
    .transform((data) => ({
      disabled: data['disabled'],
      key: data['key'],
      steps: data['steps'],
    }));
});
