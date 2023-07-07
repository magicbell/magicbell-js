// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../resource';
import * as schemas from '../schemas/notifications';
import { type RequestOptions } from '../types';

type CreateNotificationsResponse = FromSchema<typeof schemas.CreateNotificationsResponseSchema>;
type CreateNotificationsPayload = FromSchema<typeof schemas.CreateNotificationsPayloadSchema>;

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
}
