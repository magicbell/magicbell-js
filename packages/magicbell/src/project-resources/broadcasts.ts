// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../client/method';
import { Resource } from '../client/resource';
import { type RequestOptions } from '../client/types';
import * as schemas from '../schemas/broadcasts';
import { BroadcastsNotifications } from './broadcasts/notifications';

type CreateBroadcastsResponse = FromSchema<typeof schemas.CreateBroadcastsResponseSchema>;
type CreateBroadcastsPayload = FromSchema<typeof schemas.CreateBroadcastsPayloadSchema>;
type ListBroadcastsResponse = FromSchema<typeof schemas.ListBroadcastsResponseSchema>;
type ListBroadcastsPayload = FromSchema<typeof schemas.ListBroadcastsPayloadSchema>;
type GetBroadcastsResponse = FromSchema<typeof schemas.GetBroadcastsResponseSchema>;

export class Broadcasts extends Resource {
  path = 'broadcasts';
  entity = 'broadcast';
  notifications = new BroadcastsNotifications(this.client);

  /**
   * Create a broadcast to send notifications to upto a 1,000 recipients - users or
   * topic subscribers. You can identify users by their email address or by an
   * external_id.
   *
   * You don't have to import your users into MagicBell. If a user does not exist
   * we'll create it automatically.
   *
   * You can send user attributes like first_name, custom_attributes, and more when
   * creating a broadcast.
   *
   * A new notification will be shown in the inbox of each recipient in real-time. It
   * will also be delivered to each recipient through all channels you have enabled
   * for your project.
   *
   * @param data
   * @param options - override client request options.
   * @returns A broadcast is a precursor to a notification. When you specify multiple
   *   recipients, MagicBell creates a notification for each recipient and delivers it
   *   to them based on their preferences.
   **/
  create(data: CreateBroadcastsPayload, options?: RequestOptions): Promise<CreateBroadcastsResponse> {
    return this.request(
      {
        method: 'POST',
      },
      data,
      options,
    );
  }

  /**
   * List all broadcasts. Broadcasts are sorted in descending order by the sent_at
   * timestamp.
   *
   * @param options - override client request options.
   * @returns
   **/
  list(options?: RequestOptions): IterablePromise<ListBroadcastsResponse>;

  /**
   * List all broadcasts. Broadcasts are sorted in descending order by the sent_at
   * timestamp.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  list(data: ListBroadcastsPayload, options?: RequestOptions): IterablePromise<ListBroadcastsResponse>;

  list(
    dataOrOptions: ListBroadcastsPayload | RequestOptions,
    options?: RequestOptions,
  ): IterablePromise<ListBroadcastsResponse> {
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
   * Fetch a broadcast by its ID.
   *
   * @param broadcastId - ID of the broadcast.
   * @param options - override client request options.
   * @returns A broadcast is a precursor to a notification. When you specify multiple
   *   recipients, MagicBell creates a notification for each recipient and delivers it
   *   to them based on their preferences.
   **/
  get(broadcastId: string, options?: RequestOptions): Promise<GetBroadcastsResponse> {
    return this.request(
      {
        method: 'GET',
        path: '{broadcast_id}',
      },
      broadcastId,
      options,
    );
  }
}
