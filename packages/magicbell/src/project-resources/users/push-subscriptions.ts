// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../../client/method';
import { Resource } from '../../client/resource';
import { type RequestOptions } from '../../client/types';
import * as schemas from '../../schemas/users/push-subscriptions';

type ListUsersPushSubscriptionsResponse = FromSchema<typeof schemas.ListUsersPushSubscriptionsResponseSchema>;
type ListUsersPushSubscriptionsPayload = FromSchema<typeof schemas.ListUsersPushSubscriptionsPayloadSchema>;

export class UsersPushSubscriptions extends Resource {
  path = 'users';
  entity = 'push_subscription';

  /**
   * Fetch a user's push subscriptions. Returns a paginated list of web and mobile
   * push subscriptions for all platforms.
   *
   * @param userId - The user id is the MagicBell user id. Accepts a UUID
   * @param options - override client request options.
   * @returns
   **/
  list(userId: string, options?: RequestOptions): IterablePromise<ListUsersPushSubscriptionsResponse>;

  /**
   * Fetch a user's push subscriptions. Returns a paginated list of web and mobile
   * push subscriptions for all platforms.
   *
   * @param userId - The user id is the MagicBell user id. Accepts a UUID
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  list(
    userId: string,
    data: ListUsersPushSubscriptionsPayload,
    options?: RequestOptions,
  ): IterablePromise<ListUsersPushSubscriptionsResponse>;

  list(
    userId: string,
    dataOrOptions: ListUsersPushSubscriptionsPayload | RequestOptions,
    options?: RequestOptions,
  ): IterablePromise<ListUsersPushSubscriptionsResponse> {
    return this.request(
      {
        method: 'GET',
        path: '{user_id}/push_subscriptions',
        paged: true,
      },
      userId,
      dataOrOptions,
      options,
    );
  }

  /**
   * Delete a user's push subscriptions. Identifies the user by the user's ID and the
   * push subscription by the subscription's ID.
   *
   * @param userId - The user id is the MagicBell user id. Accepts a UUID
   * @param subscriptionId - ID of the subscription.
   *   The ID of a subscription can be obtained from the "Fetch user subscriptions" API
   *   endpoint or from push events sent to the MagicBell React library.
   *
   * @param options - override client request options.
   **/
  delete(userId: string, subscriptionId: string, options?: RequestOptions): Promise<void> {
    return this.request(
      {
        method: 'DELETE',
        path: '{user_id}/push_subscriptions/{subscription_id}',
      },
      userId,
      subscriptionId,
      options,
    );
  }
}
