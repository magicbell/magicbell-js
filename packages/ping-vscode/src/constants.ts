export type ValueOf<T> = T[keyof T];

export const signalKeys = {
  ACTIVE_NOTIFICATION: 'ACTIVE_NOTIFICATION',
  NOTIFICATIONS: 'NOTIFICATIONS',
} as const;

export const commandKeys = {
  DETAIL_PANE: 'ping.detail',
} as const;

export const contextKeys = {
  ACTIVE_NOTIFICATION: 'ping.activeNotification',
} as const;

export const viewTypes = {
  LIST: 'ping.list',
  LIST_DETAIL: 'ping.listDetail',
  DETAIL: 'ping.detail',
};
