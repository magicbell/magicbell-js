import MagicBell from './components/MagicBell/index.js';

export default MagicBell;
export { MagicBell };
export { default as Badge } from './components/Badge/index.js';
export { default as ClassicBellIcon } from './components/Bell/ClassicBellIcon.js';
export { default as Bell } from './components/Bell/index.js';
export * from './components/Bell/index.js';
export {
  type ClickableNotificationProps,
  default as ClickableNotification,
  StyledNotificationContainer,
} from './components/ClickableNotification/index.js';
export { EnablePushNotificationsButton } from './components/EnablePushNotificationsBanner/index.js';
export { default as FloatingInboxContainer } from './components/FloatingNotificationInbox/FloatingInboxContainer.js';
export { default as FloatingNotificationInbox } from './components/FloatingNotificationInbox/index.js';
export { default as Footer } from './components/Footer/index.js';
export { default as Header } from './components/Header/index.js';
export { default as MagicBellProvider } from './components/MagicBellProvider/index.js';
export { default as NotificationContent } from './components/NotificationContent/index.js';
export { default as NotificationInbox } from './components/NotificationInbox/index.js';
export { default as NotificationList } from './components/NotificationList/index.js';
export { default as NotificationState } from './components/NotificationState/index.js';
export { default as PushNotificationsSubscriber } from './components/PushNotificationsSubscriber/index.js';
export { default as Timestamp } from './components/Timestamp/index.js';
export { default as NotificationPreferences } from './components/UserPreferencesPanel/PreferencesCategories.js';
export { default as MagicBellContext, useMagicBellContext } from './context/MagicBellContext.js';
export { default as MagicBellThemeContext, useTheme } from './context/MagicBellThemeContext.js';
export type { IMagicBellTheme } from './context/Theme.js';
export { defaultTheme as defaultMagicBellTheme } from './context/Theme.js';
export { darken, toRGBA } from './lib/color.js';
export type { CustomLocale } from './lib/i18n.js';
export { merge } from './lib/merge.js';
export * from './themes/index.js';
export {
  type INotification,
  type INotificationsStoresCollection,
  type INotificationStore,
  type IRemoteConfig,
  type IRemoteNotification,
  type IRemoteNotificationPreferences,
  type Notification,
  clientSettings,
  eventAggregator,
  useMagicBellEvent,
  useNotification,
  useNotificationPreferences,
  useNotifications,
  useNotificationStoresCollection,
  useNotificationUnmount,
} from '@magicbell/react-headless';
