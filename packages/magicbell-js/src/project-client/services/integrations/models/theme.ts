import { z } from 'zod';

import { Banner, banner, bannerRequest, bannerResponse } from './banner.js';
import { Dialog, dialog, dialogRequest, dialogResponse } from './dialog.js';
import { Footer, footer, footerRequest, footerResponse } from './footer.js';
import { Header, header, headerRequest, headerResponse } from './header.js';
import { Icon, icon, iconRequest, iconResponse } from './icon.js';
import { Notification, notification, notificationRequest, notificationResponse } from './notification.js';
import { UnseenBadge, unseenBadge, unseenBadgeRequest, unseenBadgeResponse } from './unseen-badge.js';

/**
 * Zod schema for the Theme model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const theme = z.lazy(() => {
  return z.object({
    banner: banner.optional(),
    dialog: dialog.optional(),
    footer: footer.optional(),
    header: header.optional(),
    icon: icon.optional(),
    notification: notification.optional(),
    unseenBadge: unseenBadge.optional(),
  });
});

/**
 * Visual customization options for the hosted inbox widget.
 * @typedef  {Theme} theme - Visual customization options for the hosted inbox widget. - Visual customization options for the hosted inbox widget.
 * @property {Banner} - Top banner styling options.
 * @property {Dialog} - Styling for confirmation and action dialogs.
 * @property {Footer} - Footer styling for the inbox modal.
 * @property {Header} - Header styling for the inbox modal.
 * @property {Icon} - Launcher icon styling overrides.
 * @property {Notification} - Styling overrides for notification list items.
 * @property {UnseenBadge} - Badge styling for unseen notification counts.
 */
export type Theme = z.infer<typeof theme>;

/**
 * Zod schema for mapping API responses to the Theme application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const themeResponse = z.lazy(() => {
  return z
    .object({
      banner: bannerResponse.optional(),
      dialog: dialogResponse.optional(),
      footer: footerResponse.optional(),
      header: headerResponse.optional(),
      icon: iconResponse.optional(),
      notification: notificationResponse.optional(),
      unseenBadge: unseenBadgeResponse.optional(),
    })
    .transform((data) => ({
      banner: data['banner'],
      dialog: data['dialog'],
      footer: data['footer'],
      header: data['header'],
      icon: data['icon'],
      notification: data['notification'],
      unseenBadge: data['unseenBadge'],
    }));
});

/**
 * Zod schema for mapping the Theme application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const themeRequest = z.lazy(() => {
  return z
    .object({
      banner: bannerRequest.optional(),
      dialog: dialogRequest.optional(),
      footer: footerRequest.optional(),
      header: headerRequest.optional(),
      icon: iconRequest.optional(),
      notification: notificationRequest.optional(),
      unseenBadge: unseenBadgeRequest.optional(),
    })
    .transform((data) => ({
      banner: data['banner'],
      dialog: data['dialog'],
      footer: data['footer'],
      header: data['header'],
      icon: data['icon'],
      notification: data['notification'],
      unseenBadge: data['unseenBadge'],
    }));
});
