export { default as MagicBellProvider } from './components/MagicBellProvider';
export { default as RealtimeListener } from './components/RealtimeListener';
export { default as WebPushNotificationsSubscriber } from './components/WebPushNotificationsSubscriber';
export { default as useBell } from './hooks/useBell';
export { default as useMagicBellEvent } from './hooks/useMagicBellEvent';
export { default as useNotification } from './hooks/useNotification';
export { default as useNotificationFactory } from './hooks/useNotificationFactory';
export { default as useNotifications } from './hooks/useNotifications';
export { default as useNotificationUnmount } from './hooks/useNotificationUnmount';
export { deleteAPI, fetchAPI, postAPI, putAPI } from './lib/ajax';
export { secondsToDate, toDate, toUnix } from './lib/date';
export { eventAggregator, pushEventAggregator } from './lib/realtime';
export { registry } from './lib/registry';
export { default as clientSettings } from './stores/clientSettings';
export { default as useConfig } from './stores/config';
export { default as useNotificationPreferences } from './stores/notification_preferences';
export { useNotificationStoresCollection } from './stores/notifications';
export { default as buildStore } from './stores/notifications/helpers/buildStore';
export * from './types';
export { type INotification as Notification } from './types';

import warning from 'tiny-warning';

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const testFunc = function testFn() {};

  warning(
    (testFunc.name || testFunc.toString()).indexOf('testFn') !== -1,
    "It looks like you're using a minified copy of the development build " +
      `of ${__PACKAGE_NAME__}. When deploying your app to production, make sure to use ` +
      'the production build which is faster and does not print development warnings.',
  );
}
