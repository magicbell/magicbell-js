/**
 * The types here are used to define a json schema with the structure defined at
 * https://www.magicbell.com/docs/rest-api/reference#get-preferences
 *
 * {
 *   "categories": [
 *     {
 *       "label": "Billing",
 *       "slug": "billing",
 *       "channels": [
 *         {
 *           "label": "In app",
 *           "slug": "in_app",
 *           "enabled": true
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

/**
 * A channel preference defines the enabled/disabled state of a given channel for a given category. For example, an
 * email channel for the Billing category may be disabled meaning any notificaitons sent to the Billing category would
 * not have a notification sent to the email channel.
 */
export type ChannelPreference = {
  /** A human readable label often shown in the UI. The value is unique across MagicBell */
  label: string;
  /** A human readable and machine usable value unique across MagicBell. */
  slug: string;
  /**
   * When true, the channel has been configured to be enabled and any notifications sent to the category may be sent to
   * this channel (additional filtering may occurr).
   */
  enabled: boolean;
};

/**
 * The category channel preferences assocites a category preference with the channel preferences.
 */
export type CategoryChannelPreference = {
  /** A human readable label often shown in the UI. The value is unique per project and/or user */
  label: string;
  /** A human readable and machine usable value unique per project and/or user. */
  slug: string;
  /** Preferences for each channel enabled for the project */
  channels: ChannelPreference[];
};

/**
 * All category preferences: in practice containing category preferences for a given project and/or user.
 */
export default interface IRemoteNotificationPreferences {
  categories: CategoryChannelPreference[];
}
