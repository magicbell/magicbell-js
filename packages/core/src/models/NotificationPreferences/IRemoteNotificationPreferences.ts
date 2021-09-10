export type CategoryChannelPreferences = {
  email: boolean;
  inApp: boolean;
  webPush: boolean;
};

export type CategoryPreference = {
  [key: string]: CategoryChannelPreferences;
};

export interface INotificationPreferences {
  categories: CategoryPreference;
}

export default interface IRemoteNotificationPreferences {
  notification_preferences: INotificationPreferences;
}
