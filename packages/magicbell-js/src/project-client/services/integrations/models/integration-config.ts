import { z } from 'zod';

/**
 * Zod schema for the IntegrationConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const integrationConfig = z.lazy(() => {
  return z.object({
    config: z.any(),
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {IntegrationConfig} integrationConfig
 * @property {any}
 * @property {string}
 * @property {string}
 */
export type IntegrationConfig = z.infer<typeof integrationConfig>;

/**
 * Zod schema for mapping API responses to the IntegrationConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const integrationConfigResponse = z.lazy(() => {
  return z
    .object({
      config: z.any(),
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * Zod schema for mapping the IntegrationConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const integrationConfigRequest = z.lazy(() => {
  return z
    .object({
      config: z.any(),
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
