// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../client/method';
import { Resource } from '../client/resource';
import { type RequestOptions } from '../client/types';
import * as schemas from '../schemas/notifications';

type ListNotificationsResponse = FromSchema<typeof schemas.ListNotificationsResponseSchema>;
type ListNotificationsPayload = FromSchema<typeof schemas.ListNotificationsPayloadSchema>;
type GetNotificationsResponse = FromSchema<typeof schemas.GetNotificationsResponseSchema>;
type MarkAllReadNotificationsPayload = FromSchema<typeof schemas.MarkAllReadNotificationsPayloadSchema>;
type MarkAllSeenNotificationsPayload = FromSchema<typeof schemas.MarkAllSeenNotificationsPayloadSchema>;

export class Notifications extends Resource {
  path = 'notifications';
  entity = 'notification';

  /**
   * Fetch a user's notifications. Notifications are sorted in descending order by
   * the sent_at timestamp.
   *
   * @param options - override client request options.
   * @returns
   **/
  list(options?: RequestOptions): IterablePromise<ListNotificationsResponse>;

  /**
   * Fetch a user's notifications. Notifications are sorted in descending order by
   * the sent_at timestamp.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  list(data: ListNotificationsPayload, options?: RequestOptions): IterablePromise<ListNotificationsResponse>;

  list(
    dataOrOptions: ListNotificationsPayload | RequestOptions,
    options?: RequestOptions,
  ): IterablePromise<ListNotificationsResponse> {
    return this.request(
      {
        method: 'GET',
        paged: true,
      },
      dataOrOptions,
      options,
    );
  }

  /**
   * Fetch a user's notification by its ID.
   *
   * @param notificationId - ID of the user notification.
   *   The ID of a user notification can be obtained from the "Fetch user
   *   notifications" API endpoint or from push events sent to the MagicBell React
   *   library.
   *
   * @param options - override client request options.
   * @returns
   **/
  get(notificationId: string, options?: RequestOptions): Promise<GetNotificationsResponse> {
    return this.request(
      {
        method: 'GET',
        path: '{notification_id}',
      },
      notificationId,
      options,
    );
  }

  /**
   * Delete a user's notification by its ID. The notification is deleted immediately
   * and removed from the user's notification inbox in real-time.
   *
   * @param notificationId - ID of the user notification.
   *   The ID of a user notification can be obtained from the "Fetch user
   *   notifications" API endpoint or from push events sent to the MagicBell React
   *   library.
   *
   * @param options - override client request options.
   **/
  delete(notificationId: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'DELETE',
        path: '{notification_id}',
      },
      notificationId,
      options,
    );
  }

  /**
   * Mark a user notification as read. The notification will be automatically marked
   * as seen, too.
   *
   * The new state will be reflected in the user's notification inbox in real-time.
   *
   * @param notificationId - ID of the user notification.
   *   The ID of a user notification can be obtained from the "Fetch user
   *   notifications" API endpoint or from push events sent to the MagicBell React
   *   library.
   *
   * @param options - override client request options.
   **/
  markAsRead(notificationId: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'POST',
        path: '{notification_id}/read',
      },
      notificationId,
      options,
    );
  }

  /**
   * Mark a user notification as unread. The new state will be reflected in the
   * user's notification inbox in real-time.
   *
   * @param notificationId - ID of the user notification.
   *   The ID of a user notification can be obtained from the "Fetch user
   *   notifications" API endpoint or from push events sent to the MagicBell React
   *   library.
   *
   * @param options - override client request options.
   **/
  markAsUnread(notificationId: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'POST',
        path: '{notification_id}/unread',
      },
      notificationId,
      options,
    );
  }

  /**
   * Mark a user notification as archived.
   *
   * @param notificationId - ID of the user notification.
   *   The ID of a user notification can be obtained from the "Fetch user
   *   notifications" API endpoint or from push events sent to the MagicBell React
   *   library.
   *
   * @param options - override client request options.
   **/
  archive(notificationId: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'POST',
        path: '{notification_id}/archive',
      },
      notificationId,
      options,
    );
  }

  /**
   * Mark a user notification as unarchived.
   *
   * @param notificationId - ID of the user notification.
   *   The ID of a user notification can be obtained from the "Fetch user
   *   notifications" API endpoint or from push events sent to the MagicBell React
   *   library.
   *
   * @param options - override client request options.
   **/
  unarchive(notificationId: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'DELETE',
        path: '{notification_id}/archive',
      },
      notificationId,
      options,
    );
  }

  /**
   * Mark all notifications of a user as read. When you call this endpoint, the
   * notification inboxes of this user will be updated in real-time.
   *
   * @param options - override client request options.
   **/
  markAllRead(options?: RequestOptions): Promise<void>;

  /**
   * Mark all notifications of a user as read. When you call this endpoint, the
   * notification inboxes of this user will be updated in real-time.
   *
   * @param data
   * @param options - override client request options.
   **/
  markAllRead(data: MarkAllReadNotificationsPayload, options?: RequestOptions): Promise<void>;

  markAllRead(
    dataOrOptions: MarkAllReadNotificationsPayload | RequestOptions,
    options?: RequestOptions,
  ): Promise<void> {
    return this.request(
      {
        method: 'POST',
        path: 'read',
      },
      dataOrOptions,
      options,
    );
  }

  /**
   * Mark all notifications of a user as seen. When you call this endpoint, the
   * notification inboxes of this user will be updated in real-time.
   *
   * @param options - override client request options.
   **/
  markAllSeen(options?: RequestOptions): Promise<void>;

  /**
   * Mark all notifications of a user as seen. When you call this endpoint, the
   * notification inboxes of this user will be updated in real-time.
   *
   * @param data
   * @param options - override client request options.
   **/
  markAllSeen(data: MarkAllSeenNotificationsPayload, options?: RequestOptions): Promise<void>;

  markAllSeen(
    dataOrOptions: MarkAllSeenNotificationsPayload | RequestOptions,
    options?: RequestOptions,
  ): Promise<void> {
    return this.request(
      {
        method: 'POST',
        path: 'seen',
      },
      dataOrOptions,
      options,
    );
  }
}
