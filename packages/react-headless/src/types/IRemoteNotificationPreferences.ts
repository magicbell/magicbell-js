export type CategoryChannelPreferences = {
  label: string;
  email: boolean;
  inApp: boolean;
  webPush: boolean;
  mobilePush: boolean;
  slack: boolean;
  sms: boolean;
};

export type CategoryPreference = {
  [key: string]: CategoryChannelPreferences;
};

export default interface IRemoteNotificationPreferences {
  categories: CategoryPreference;
}
