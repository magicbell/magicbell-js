export type CategoryChannelPreferences = {
  email: boolean;
  inApp: boolean;
  webPush: boolean;
};

export type CategoryPreference = {
  [key: string]: CategoryChannelPreferences;
};

export default interface IRemoteNotificationPreferences {
  categories: CategoryPreference;
}
