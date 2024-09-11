// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../client/method.js';
import { Resource } from '../client/resource.js';
import { type RequestOptions } from '../client/types.js';
import * as schemas from '../schemas/subscriptions.js';

type CreateSubscriptionsResponse = FromSchema<typeof schemas.CreateSubscriptionsResponseSchema>;
type CreateSubscriptionsPayload = FromSchema<typeof schemas.CreateSubscriptionsPayloadSchema>;
type UnsubscribeSubscriptionsResponse = FromSchema<typeof schemas.UnsubscribeSubscriptionsResponseSchema>;
type UnsubscribeSubscriptionsPayload = FromSchema<typeof schemas.UnsubscribeSubscriptionsPayloadSchema>;
type ListSubscriptionsResponse = FromSchema<typeof schemas.ListSubscriptionsResponseSchema>;
type GetSubscriptionsResponse = FromSchema<typeof schemas.GetSubscriptionsResponseSchema>;
type DeleteSubscriptionsPayload = FromSchema<typeof schemas.DeleteSubscriptionsPayloadSchema>;

export class Subscriptions extends Resource {
  path = 'subscriptions';
  entity = 'subscription';

  /**
   * Set a user's subscription status to subscribed for a particular topic (and
   * optional categories). If the user previously unsubscribed, the user will be
   * resubscribed.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  create(data: CreateSubscriptionsPayload, options?: RequestOptions): Promise<CreateSubscriptionsResponse> {
    return this.request(
      {
        method: 'POST',
      },
      data,
      options,
    );
  }

  /**
   * Unusbscribe a user from a particular topic (and optional categories).
   *
   * @param topic - The topic for which we'd like to filter topic subscriptions.
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  unsubscribe(
    topic: string,
    data: UnsubscribeSubscriptionsPayload,
    options?: RequestOptions,
  ): Promise<UnsubscribeSubscriptionsResponse> {
    return this.request(
      {
        method: 'POST',
        path: '{topic}/unsubscribe',
      },
      topic,
      data,
      options,
    );
  }

  /**
   * Fetch a user's topic subscriptions.
   *
   * @param options - override client request options.
   * @returns
   **/
  list(options?: RequestOptions): IterablePromise<ListSubscriptionsResponse> {
    return this.request(
      {
        method: 'GET',
        paged: true,
      },
      options,
    );
  }

  /**
   * Show a user's subscription status for a particular topic and categories.
   *
   * @param topic - The topic for which we'd like to filter topic subscriptions.
   * @param options - override client request options.
   * @returns
   **/
  get(topic: string, options?: RequestOptions): Promise<GetSubscriptionsResponse> {
    return this.request(
      {
        method: 'GET',
        path: '{topic}',
      },
      topic,
      options,
    );
  }

  /**
   * Delete topic subscription(s)
   *
   * @param topic - The topic for which we'd like to filter topic subscriptions.
   * @param options - override client request options.
   **/
  delete(topic: string, options?: RequestOptions): Promise<void>;

  /**
   * Delete topic subscription(s)
   *
   * @param topic - The topic for which we'd like to filter topic subscriptions.
   * @param data
   * @param options - override client request options.
   **/
  delete(topic: string, data: DeleteSubscriptionsPayload, options?: RequestOptions): Promise<void>;

  delete(
    topic: string,
    dataOrOptions: DeleteSubscriptionsPayload | RequestOptions,
    options?: RequestOptions,
  ): Promise<void> {
    return this.request(
      {
        method: 'DELETE',
        path: '{topic}',
      },
      topic,
      dataOrOptions,
      options,
    );
  }
}
