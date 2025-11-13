import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { ThrowableError } from '../../http/errors/throwable-error.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { Broadcast, broadcastRequest, broadcastResponse } from './models/broadcast.js';
import { BroadcastCollection, broadcastCollectionResponse } from './models/broadcast-collection.js';
import { ListBroadcastsParams } from './request-params.js';

export class BroadcastsService extends BaseService {
  /**
   * Retrieves a paginated list of broadcasts for the project. Returns basic information about each broadcast including its creation time and status.
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<BroadcastCollection>>} - OK
   */
  async listBroadcasts(
    params?: ListBroadcastsParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<BroadcastCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/broadcasts')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: broadcastCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<BroadcastCollection>(request);
  }

  /**
   * Creates a new broadcast. When a broadcast is created, it generates individual notifications for relevant users within the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<Broadcast>>} - Created
   */
  async createBroadcast(body: Broadcast, requestConfig?: RequestConfig): Promise<HttpResponse<Broadcast>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/broadcasts')
      .setRequestSchema(broadcastRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: broadcastResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<Broadcast>(request);
  }

  /**
   * Retrieves detailed information about a specific broadcast by its ID. Includes the broadcast's configuration and current status.
   * @param {string} broadcastId -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<Broadcast>>} - OK
   */
  async fetchBroadcast(broadcastId: string, requestConfig?: RequestConfig): Promise<HttpResponse<Broadcast>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/broadcasts/{broadcast_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: broadcastResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'broadcast_id',
        value: broadcastId,
      })
      .build();
    return this.client.call<Broadcast>(request);
  }
}
