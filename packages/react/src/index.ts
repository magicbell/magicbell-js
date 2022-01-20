import MagicBell from './components/MagicBell';
export default MagicBell;

export { default as Badge } from './components/Badge';
export { default as Bell } from './components/Bell';
export {
  default as ClickableNotification,
  StyledNotificationContainer,
} from './components/ClickableNotification';
export { EnablePushNotificationsButton } from './components/EnablePushNotificationsBanner';
export { default as FloatingNotificationInbox } from './components/FloatingNotificationInbox';
export { default as FloatingNotificationInboxArrow } from './components/FloatingNotificationInbox/Arrow';
export { default as Footer } from './components/Footer';
export { default as Header } from './components/Header';
export { default as MagicBellProvider } from './components/MagicBellProvider';
export { default as NotificationContent } from './components/NotificationContent';
export { default as NotificationInbox } from './components/NotificationInbox';
export { default as NotificationList } from './components/NotificationList';
export { default as NotificationState } from './components/NotificationState';
export { default as NotificationPreferences } from './components/UserPreferencesPanel/PreferencesCategories';
export type { PopoverPlacement } from './components/Popover';
export { default as Popover } from './components/Popover';
export { default as PushNotificationsSubscriber } from './components/PushNotificationsSubscriber';
export { default as Timestamp } from './components/Timestamp';
export { default as MagicBellContext, useMagicBellContext } from './context/MagicBellContext';
export { default as MagicBellThemeContext, useTheme } from './context/MagicBellThemeContext';
export type { IMagicBellTheme } from './context/Theme';
export { defaultTheme as defaultMagicBellTheme } from './context/Theme';
export { darken, toRGBA } from './lib/color';
export {
  clientSettings,
  eventAggregator,
  INotification,
  INotificationsStoresCollection,
  INotificationStore,
  IRemoteConfig,
  IRemoteNotification,
  IRemoteNotificationPreferences,
  Notification,
  useMagicBellEvent,
  useNotification,
  useNotificationPreferences,
  useNotifications,
  useNotificationStoresCollection,
  useNotificationUnmount,
} from '@magicbell/react-headless';
