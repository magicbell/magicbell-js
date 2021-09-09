import { NotificationStoresMap } from '@magicbell/core';

export function getDefaultNotificationStoreMap() {
  return new NotificationStoresMap([{ id: 'default', context: {} }]);
}
