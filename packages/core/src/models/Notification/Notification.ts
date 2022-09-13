import DOMPurify from 'dompurify';
import isNil from 'lodash/isNil';

import { secondsToDate, toUnix } from '../../lib/date';
import camelize from '../../lib/decorators/camelize';
import unwrap from '../../lib/decorators/unwrap';
import wrap from '../../lib/decorators/wrap';
import { NewNotification } from './NewNotification';
import NotificationFactory from './NotificationFactory';
import NotificationRepository from './NotificationRepository';

/**
 * A notification.
 *
 * @example
 * const notification = new Notification({ id })
 * notification.fetch()
 */
export default class Notification {
  id?: string | null = null;
  title: string;
  content: string | null;
  category: string | null;
  actionUrl?: string | null;
  customAttributes: Record<string, any>;
  readAt: number | null;
  seenAt: number | null;
  sentAt: number;
  deletedAt: number | null = null;

  private repo: NotificationRepository;

  constructor(attrs = {}) {
    this.set(attrs);
    this.repo = new NotificationRepository();
  }

  @wrap('notification')
  static async create(notificationContent: NewNotification) {
    const repo = new NotificationRepository();

    try {
      const data = await repo.create(notificationContent);
      return NotificationFactory.create(data);
    } catch (error) {
      if (error.response?.status === 422) throw error.response.data;
      else throw error;
    }
  }

  get seenAtDate() {
    return secondsToDate(this.seenAt);
  }

  get sentAtDate() {
    return secondsToDate(this.sentAt);
  }

  get readAtDate() {
    return secondsToDate(this.readAt);
  }

  get isRead() {
    return !!this.readAt;
  }

  set isRead(isRead) {
    this.readAt = isRead ? toUnix() : null;
  }

  get isSeen() {
    return !!this.seenAt;
  }

  set isSeen(isSeen) {
    this.seenAt = isSeen ? toUnix() : null;
  }

  get sanitizedContent() {
    if (!isNil(this.content)) return DOMPurify.sanitize(this.content);
    return this.content;
  }

  /**
   * Fetch the notification from the API server.
   */
  async fetch() {
    if (this.id) {
      const json = await this.repo.get(this.id);
      this.set(json);

      return json;
    } else {
      throw Error('The notification does not exist yet, save it first');
    }
  }

  /**
   * Delete a notification from the API server.
   */
  async delete() {
    if (this.id) {
      this.deletedAt = Date.now();
      return this.repo.delete(this.id);
    } else {
      throw Error('The notification does not exist yet, save it first');
    }
  }

  /**
   * Mark a notification as read. Sets the `readAt` attribute to the current unix
   * timestamp. It also marks the notification as seen.
   */
  markAsRead() {
    if (this.id) {
      this.isRead = true;
      this.isSeen = true;

      return this.repo.markAsRead(this.id);
    } else {
      const error = Error('The notification does not exist yet, save it first');
      return Promise.reject(error);
    }
  }

  /**
   * Mark a notification as unread. Sets the `readAt` attribute to null.
   */
  markAsUnread() {
    if (this.id) {
      this.isRead = false;
      return this.repo.markAsUnread(this.id);
    } else {
      const error = Error('The notification does not exist yet, save it first');
      return Promise.reject(error);
    }
  }

  @unwrap('notification')
  @camelize()
  set(json = {}) {
    const jsonWithCustomAttributes = this.transformCustomAttributes(json);
    Object.assign(this, jsonWithCustomAttributes);
  }

  private transformCustomAttributes(json) {
    const { customAttributes, ...otherAttrs } = json;

    if (typeof customAttributes === 'string') {
      try {
        const parsedCustomAttributes = JSON.parse(customAttributes);
        return { customAttributes: parsedCustomAttributes, ...otherAttrs };
      } catch (e) {
        console.warn('"customAttributes" is not valid JSON');
      }
    }

    return json;
  }
}
