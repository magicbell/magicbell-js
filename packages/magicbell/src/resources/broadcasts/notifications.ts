// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../../method';
import { Resource } from '../../resource';
import * as schemas from '../../schemas/broadcasts/notifications';
import { type RequestOptions } from '../../types';

type ListBroadcastsNotificationsResponse = FromSchema<typeof schemas.ListBroadcastsNotificationsResponseSchema>;
type ListBroadcastsNotificationsPayload = FromSchema<typeof schemas.ListBroadcastsNotificationsPayloadSchema>;

export class BroadcastsNotifications extends Resource {
  path = 'broadcasts';
  entity = 'notification';

  /**
   * Fetch the notifications on a notification broadcast.
   *
   * @param broadcastId - ID of the notification broadcast.
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  list(broadcastId: string, options?: RequestOptions): IterablePromise<ListBroadcastsNotificationsResponse>;

  /**
   * Fetch the notifications on a notification broadcast.
   *
   * @param broadcastId - ID of the notification broadcast.
   * @param data
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  list(
    broadcastId: string,
    data: ListBroadcastsNotificationsPayload,
    options?: RequestOptions,
  ): IterablePromise<ListBroadcastsNotificationsResponse>;

  list(
    broadcastId: string,
    dataOrOptions: ListBroadcastsNotificationsPayload | RequestOptions,
    options?: RequestOptions,
  ): IterablePromise<ListBroadcastsNotificationsResponse> {
    this.assertFeatureFlag('broadcasts-notifications-list');

    return this.request(
      {
        method: 'GET',
        path: '{broadcast_id}/notifications',
        paged: true,
      },
      broadcastId,
      dataOrOptions,
      options,
    );
  }
}
