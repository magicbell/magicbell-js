import { z } from 'zod';

import { Banner, banner, bannerRequest, bannerResponse } from './banner.js';
import { Dialog, dialog, dialogRequest, dialogResponse } from './dialog.js';
import { Footer, footer, footerRequest, footerResponse } from './footer.js';
import { Header, header, headerRequest, headerResponse } from './header.js';
import { Icon, icon, iconRequest, iconResponse } from './icon.js';
import { Notification, notification, notificationRequest, notificationResponse } from './notification.js';
import { UnseenBadge, unseenBadge, unseenBadgeRequest, unseenBadgeResponse } from './unseen-badge.js';

/**
 * The shape of the model inside the application code - what the users use
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
 *
 * @typedef  {Theme} theme
 * @property {Banner}
 * @property {Dialog}
 * @property {Footer}
 * @property {Header}
 * @property {Icon}
 * @property {Notification}
 * @property {UnseenBadge}
 */
export type Theme = z.infer<typeof theme>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
