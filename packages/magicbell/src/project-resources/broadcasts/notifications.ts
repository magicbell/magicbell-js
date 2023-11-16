// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../../client/method';
import { Resource } from '../../client/resource';
import { type RequestOptions } from '../../client/types';
import * as schemas from '../../schemas/broadcasts/notifications';

type ListBroadcastsNotificationsResponse = FromSchema<typeof schemas.ListBroadcastsNotificationsResponseSchema>;
type ListBroadcastsNotificationsPayload = FromSchema<typeof schemas.ListBroadcastsNotificationsPayloadSchema>;

export class BroadcastsNotifications extends Resource {
  path = 'broadcasts';
  entity = 'notification';

  /**
   * Fetch the notifications for a broadcast.
   *
   * @param broadcastId - ID of the broadcast.
   * @param options - override client request options.
   * @returns
   **/
  list(broadcastId: string, options?: RequestOptions): IterablePromise<ListBroadcastsNotificationsResponse>;

  /**
   * Fetch the notifications for a broadcast.
   *
   * @param broadcastId - ID of the broadcast.
   * @param data
   * @param options - override client request options.
   * @returns
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
