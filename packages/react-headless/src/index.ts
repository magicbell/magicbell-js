import pkg from '../package.json';
import { warning } from './polyfills/tiny-warning-module.js';

export { default as MagicBellProvider } from './components/MagicBellProvider/MagicBellProvider.js';
export { default as RealtimeListener } from './components/RealtimeListener.js';
export { default as WebPushNotificationsSubscriber } from './components/WebPushNotificationsSubscriber/WebPushNotificationsSubscriber.js';
export { default as useBell } from './hooks/useBell.js';
export { default as useMagicBellEvent } from './hooks/useMagicBellEvent.js';
export { default as useNotification } from './hooks/useNotification.js';
export { default as useNotificationFactory } from './hooks/useNotificationFactory.js';
export { default as useNotifications } from './hooks/useNotifications.js';
export { default as useNotificationUnmount } from './hooks/useNotificationUnmount.js';
export { deleteAPI, fetchAPI, postAPI, putAPI } from './lib/ajax.js';
export { secondsToDate, toDate, toUnix } from './lib/date.js';
export { eventAggregator, pushEventAggregator } from './lib/realtime.js';
export { default as clientSettings } from './stores/clientSettings.js';
export { default as useConfig } from './stores/config/useConfig.js';
export { default as useNotificationPreferences } from './stores/notification_preferences/useNotificationPreferences.js';
export { default as buildStore } from './stores/notifications/helpers/buildStore.js';
export { default as useNotificationStoresCollection } from './stores/notifications/useNotificationStoresCollection.js';
export * from './types/index.js';
export { type INotification as Notification } from './types/index.js';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const testFunc = function testFn() {};

  warning(
    (testFunc.name || testFunc.toString()).indexOf('testFn') !== -1,
    "It looks like you're using a minified copy of the development build " +
      `of ${pkg.name}. When deploying your app to production, make sure to use ` +
      'the production build which is faster and does not print development warnings.',
  );
}
