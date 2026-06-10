import { z } from 'zod';

import { UnseenHover, unseenHover, unseenHoverRequest, unseenHoverResponse } from './unseen-hover.js';
import { UnseenState, unseenState, unseenStateRequest, unseenStateResponse } from './unseen-state.js';

/**
 * Zod schema for the Unseen model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const unseen = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    hover: unseenHover.optional(),
    state: unseenState.optional(),
    textColor: z.string(),
  });
});

/**
 * Overrides for unseen notifications.
 * @typedef  {Unseen} unseen - Overrides for unseen notifications. - Overrides for unseen notifications.
 * @property {string} - Background color applied to unseen notifications.
 * @property {UnseenHover} - Hover styles for unseen notifications.
 * @property {UnseenState} - State indicator styling for unseen notifications.
 * @property {string} - Text color used when a notification is unseen.
 */
export type Unseen = z.infer<typeof unseen>;

/**
 * Zod schema for mapping API responses to the Unseen application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      hover: unseenHoverResponse.optional(),
      state: unseenStateResponse.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      hover: data['hover'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});

/**
 * Zod schema for mapping the Unseen application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      hover: unseenHoverRequest.optional(),
      state: unseenStateRequest.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      hover: data['hover'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});
