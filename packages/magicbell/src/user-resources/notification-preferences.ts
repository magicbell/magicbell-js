// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../client/resource.js';
import { type RequestOptions } from '../client/types.js';
import * as schemas from '../schemas/notification-preferences.js';

type GetNotificationPreferencesResponse = FromSchema<typeof schemas.GetNotificationPreferencesResponseSchema>;
type UpdateNotificationPreferencesResponse = FromSchema<typeof schemas.UpdateNotificationPreferencesResponseSchema>;
type UpdateNotificationPreferencesPayload = FromSchema<typeof schemas.UpdateNotificationPreferencesPayloadSchema>;

export class NotificationPreferences extends Resource {
  path = 'notification_preferences';
  entity = 'notification_preferences';

  /**
   * Fetch a user's notification preferences. If a user does not disable a channel
   * explicitly, we would send notifications through that channel as long as your
   * project is enabled.
   *
   * @param options - override client request options.
   * @returns
   **/
  get(options?: RequestOptions): Promise<GetNotificationPreferencesResponse> {
    return this.request(
      {
        method: 'GET',
      },
      options,
    );
  }

  /**
   * Update a user's notification preferences. These preferences will be applied only
   * to channels you enabled for your project.
   *
   * @param options - override client request options.
   * @returns
   **/
  update(options?: RequestOptions): Promise<UpdateNotificationPreferencesResponse>;

  /**
   * Update a user's notification preferences. These preferences will be applied only
   * to channels you enabled for your project.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  update(
    data: UpdateNotificationPreferencesPayload,
    options?: RequestOptions,
  ): Promise<UpdateNotificationPreferencesResponse>;

  update(
    dataOrOptions: UpdateNotificationPreferencesPayload | RequestOptions,
    options?: RequestOptions,
  ): Promise<UpdateNotificationPreferencesResponse> {
    return this.request(
      {
        method: 'PUT',
      },
      dataOrOptions,
      options,
    );
  }
}
