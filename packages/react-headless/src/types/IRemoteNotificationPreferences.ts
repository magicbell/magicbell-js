export type CategoryChannelPreferences = {
  email: boolean;
  inApp: boolean;
  webPush: boolean;
};

export type CategoryPreference = {
  [key: string]: CategoryChannelPreferences;
};

export interface IRemoteNotificationPreferences {
  categories: CategoryPreference;
}
