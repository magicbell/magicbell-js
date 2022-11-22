// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../method';
import { Resource } from '../resource';
import * as schemas from '../schemas/notifications';
import { type RequestOptions } from '../types';

type CreateNotificationsResponse = FromSchema<typeof schemas.CreateNotificationsResponseSchema>;
type CreateNotificationsPayload = FromSchema<typeof schemas.CreateNotificationsPayloadSchema>;
type ListNotificationsResponse = FromSchema<typeof schemas.ListNotificationsResponseSchema>;
type ListNotificationsPayload = FromSchema<typeof schemas.ListNotificationsPayloadSchema>;
type GetNotificationsResponse = FromSchema<typeof schemas.GetNotificationsResponseSchema>;
type MarkAllReadNotificationsPayload = FromSchema<typeof schemas.MarkAllReadNotificationsPayloadSchema>;
type MarkAllSeenNotificationsPayload = FromSchema<typeof schemas.MarkAllSeenNotificationsPayloadSchema>;

export class Notifications extends Resource {
  path = 'notifications';
  entity = 'notification';

  /**
   * Send a notification to one or multiple users. You can identify users by their
   * email address or by an external_id.
   *
   * You don't have to import your users into MagicBell. If a user does not exist
   * we'll create it automatically.
   *
   * You can send user attributes like first_name, custom_attributes, and more when
   * creating a notification.
   *
   * The new notification will be shown in the notification inbox of each recipient
   * in real-time. It will also be delivered to each recipient through all channels
   * you have enabled for your MagicBell project.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  create(data: CreateNotificationsPayload, options?: RequestOptions): Promise<CreateNotificationsResponse> {
    return this.request(
      {
        method: 'POST',
      },
      data,
      options,
    );
  }

  /**
   * Fetch a user's notifications. Notifications are sorted in descendent order by
   * the sent_at timestamp.
   *
   * @param options - override client request options.
   * @returns
   **/
  list(options?: RequestOptions): IterablePromise<ListNotificationsResponse>;

  /**
   * Fetch a user's notifications. Notifications are sorted in descendent order by
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
