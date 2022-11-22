// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../resource';
import * as schemas from '../schemas/push-subscriptions';
import { type RequestOptions } from '../types';

type CreatePushSubscriptionsResponse = FromSchema<typeof schemas.CreatePushSubscriptionsResponseSchema>;
type CreatePushSubscriptionsPayload = FromSchema<typeof schemas.CreatePushSubscriptionsPayloadSchema>;

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
   *
   * @beta
   **/
  create(data: CreatePushSubscriptionsPayload, options?: RequestOptions): Promise<CreatePushSubscriptionsResponse> {
    this.assertFeatureFlag('push-subscriptions-create');

    return this.request(
      {
        method: 'POST',
      },
      data,
      options,
    );
  }

  /**
   * Remove the subscription of a device to mobile push notifications. The device
   * will be discarded immediately.
   *
   * @param deviceToken - Token of the device you want to remove
   * @param options - override client request options.
   *
   * @beta
   **/
  delete(deviceToken: string, options?: RequestOptions): Promise<void> {
    this.assertFeatureFlag('push-subscriptions-delete');

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
