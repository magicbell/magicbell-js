import { z } from 'zod';

import { DefaultHover, defaultHover, defaultHoverRequest, defaultHoverResponse } from './default-hover.js';
import { DefaultState, defaultState, defaultStateRequest, defaultStateResponse } from './default-state.js';

/**
 * Zod schema for the Default_ model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const default_ = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    borderRadius: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
    hover: defaultHover.optional(),
    margin: z.string(),
    state: defaultState.optional(),
    textColor: z.string(),
  });
});

/**
 * Base styles applied to every notification item.
 * @typedef  {Default_} default_ - Base styles applied to every notification item. - Base styles applied to every notification item.
 * @property {string} - Background color for notifications in their default state.
 * @property {string} - Border radius applied to each notification card.
 * @property {string} - Font family for notification text.
 * @property {string} - Font size for notification text.
 * @property {DefaultHover} - Styles applied when a notification is hovered.
 * @property {string} - CSS margin applied around each notification card.
 * @property {DefaultState} - Accent colors for notification state indicators.
 * @property {string} - Default text color for notifications.
 */
export type Default_ = z.infer<typeof default_>;

/**
 * Zod schema for mapping API responses to the Default_ application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const defaultResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontFamily: z.string(),
      fontSize: z.string(),
      hover: defaultHoverResponse.optional(),
      margin: z.string(),
      state: defaultStateResponse.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontFamily: data['fontFamily'],
      fontSize: data['fontSize'],
      hover: data['hover'],
      margin: data['margin'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});

/**
 * Zod schema for mapping the Default_ application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const defaultRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontFamily: z.string(),
      fontSize: z.string(),
      hover: defaultHoverRequest.optional(),
      margin: z.string(),
      state: defaultStateRequest.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontFamily: data['fontFamily'],
      fontSize: data['fontSize'],
      hover: data['hover'],
      margin: data['margin'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});
