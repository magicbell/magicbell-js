import { eventAggregator } from '@magicbell/magicbell-react';
import { IRemoteNotification } from '@magicbell/react-headless';

export type EventSource = 'local' | 'remote';
export type Handler<T = unknown> = (event: { data: T; source: EventSource }) => void;
export type MagicBellEventEmitter = {
  on<Key extends keyof MagicBellEvents>(type: Key, handler: Handler<MagicBellEvents[Key]>): void;
  off<Key extends keyof MagicBellEvents>(type: Key, handler?: Handler<MagicBellEvents[Key]>): void;
};

// TODO: move this type the hooks package
export type MagicBellEvents = {
  /**
   * Emitted when a new notification is received
   */
  'notifications.new': IRemoteNotification;
  /**
   * Emitted when a notification is marked as read
   */
  'notifications.read': IRemoteNotification;
  /**
   * Emitted when all notification are marked as read
   */
  'notifications.read.all': { client_id: string } | null;
  /**
   * Emitted when a notification is marked as unread
   */
  'notifications.unread': IRemoteNotification;
  /**
   * Emitted when a notification is seen
   */
  'notifications.seen': IRemoteNotification;
  /**
   * Emitted when all notifications are seen
   */
  'notifications.seen.all': { client_id: string } | null;
  /**
   * Emitted when a notification is deleted
   */
  'notifications.delete': { client_id: string; id: string };
} & Record<string, unknown>;

// We expose a limited feature set of the emitter
const emitter = {
  on: eventAggregator.on,
  off: eventAggregator.off,
} as MagicBellEventEmitter;

export default emitter;
