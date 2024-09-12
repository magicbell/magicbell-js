// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../../client/method.js';
import { Resource } from '../../client/resource.js';
import { type RequestOptions } from '../../client/types.js';
import * as schemas from '../../schemas/users/notifications.js';

type ListUsersNotificationsResponse = FromSchema<typeof schemas.ListUsersNotificationsResponseSchema>;
type ListUsersNotificationsPayload = FromSchema<typeof schemas.ListUsersNotificationsPayloadSchema>;

export class UsersNotifications extends Resource {
  path = 'users';
  entity = 'notification';

  /**
   * Fetch the notifications and deliveries for a user.
   *
   * @param userId - The user id is the MagicBell user id. Accepts a UUID
   * @param options - override client request options.
   * @returns
   **/
  list(userId: string, options?: RequestOptions): IterablePromise<ListUsersNotificationsResponse>;

  /**
   * Fetch the notifications and deliveries for a user.
   *
   * @param userId - The user id is the MagicBell user id. Accepts a UUID
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  list(
    userId: string,
    data: ListUsersNotificationsPayload,
    options?: RequestOptions,
  ): IterablePromise<ListUsersNotificationsResponse>;

  list(
    userId: string,
    dataOrOptions: ListUsersNotificationsPayload | RequestOptions,
    options?: RequestOptions,
  ): IterablePromise<ListUsersNotificationsResponse> {
    return this.request(
      {
        method: 'GET',
        path: '{user_id}/notifications',
        paged: true,
      },
      userId,
      dataOrOptions,
      options,
    );
  }
}
