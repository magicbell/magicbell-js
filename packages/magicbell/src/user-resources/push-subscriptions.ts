// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../client/method';
import { Resource } from '../client/resource';
import { type RequestOptions } from '../client/types';
import * as schemas from '../schemas/push-subscriptions';

type CreatePushSubscriptionsResponse = FromSchema<typeof schemas.CreatePushSubscriptionsResponseSchema>;
type CreatePushSubscriptionsPayload = FromSchema<typeof schemas.CreatePushSubscriptionsPayloadSchema>;
type ListPushSubscriptionsResponse = FromSchema<typeof schemas.ListPushSubscriptionsResponseSchema>;

export class PushSubscriptions extends Resource {
  path = 'push_subscriptions';
  entity = 'push_subscription';

  /**
   * Register a device token for push notifications.
   *
   * Please keep in mind that mobile push notifications will be delivered to this
   * device only if the channel is configured and enabled.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  create(data: CreatePushSubscriptionsPayload, options?: RequestOptions): Promise<CreatePushSubscriptionsResponse> {
    return this.request(
      {
        method: 'POST',
      },
      data,
      options,
    );
  }

  /**
   * Returns the list of device tokens registered for push notifications.
   *
   * @param options - override client request options.
   * @returns
   **/
  list(options?: RequestOptions): IterablePromise<ListPushSubscriptionsResponse> {
    return this.request(
      {
        method: 'GET',
        paged: true,
      },
      options,
    );
  }

  /**
   * Deletes the registered device token to remove the mobile push subscription.
   *
   * @param deviceToken - Token of the device you want to remove
   * @param options - override client request options.
   **/
  delete(deviceToken: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'DELETE',
        path: '{device_token}',
      },
      deviceToken,
      options,
    );
  }
}
