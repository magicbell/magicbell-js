import { z } from 'zod';

import { Steps, steps, stepsRequest, stepsResponse } from './steps.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const workflowDefinition = z.lazy(() => {
  return z.object({
    disabled: z.boolean().optional(),
    key: z
      .string()
      .min(3)
      .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
    steps: z.array(steps),
  });
});

/**
 *
 * @typedef  {WorkflowDefinition} workflowDefinition
 * @property {boolean}
 * @property {string}
 * @property {Steps[]}
 */
export type WorkflowDefinition = z.infer<typeof workflowDefinition>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const workflowDefinitionResponse = z.lazy(() => {
  return z
    .object({
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
      steps: z.array(stepsResponse),
    })
    .transform((data) => ({
      disabled: data['disabled'],
      key: data['key'],
      steps: data['steps'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const workflowDefinitionRequest = z.lazy(() => {
  return z
    .object({
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
      steps: z.array(stepsRequest),
    })
    .transform((data) => ({
      disabled: data['disabled'],
      key: data['key'],
      steps: data['steps'],
    }));
});
