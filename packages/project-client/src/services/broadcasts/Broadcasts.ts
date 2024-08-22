import { z } from 'zod';

import { RequestBuilder } from '../../http/transport/request-builder';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { BaseService } from '../base-service';
import { Broadcast, broadcastRequest, broadcastResponse } from './models/broadcast';
import { BroadcastListResponse, broadcastListResponseResponse } from './models/broadcast-list-response';
import { ListBroadcastsParams } from './request-params';

export class BroadcastsService extends BaseService {
  /**
   * Returns a list of broadcasts
   * @param {number} [page] - The page number of the paginated response. Defaults to 1.
   * @param {number} [perPage] - The number of items per page. Defaults to 20.
   * @returns {Promise<HttpResponse<BroadcastListResponse>>} OK
   */
  async listBroadcasts(
    params?: ListBroadcastsParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<BroadcastListResponse>> {
    const request = new RequestBuilder<BroadcastListResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/broadcasts')
      .setRequestSchema(z.any())
      .setResponseSchema(broadcastListResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'page',
        value: params?.page,
      })
      .addQueryParam({
        key: 'per_page',
        value: params?.perPage,
      })
      .build();
    return this.client.call<BroadcastListResponse>(request);
  }

  /**
   * Handles the create notification request.
   * @returns {Promise<HttpResponse<Broadcast>>} Created
   */
  async createBroadcast(body: Broadcast, requestConfig?: RequestConfig): Promise<HttpResponse<Broadcast>> {
    const request = new RequestBuilder<Broadcast>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('POST')
      .setPath('/broadcasts')
      .setRequestSchema(broadcastRequest)
      .setResponseSchema(broadcastResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<Broadcast>(request);
  }

  /**
   * Returns a broadcast
   * @param {string} broadcastId -
   * @returns {Promise<HttpResponse<Broadcast>>} OK
   */
  async fetchBroadcast(broadcastId: string, requestConfig?: RequestConfig): Promise<HttpResponse<Broadcast>> {
    const request = new RequestBuilder<Broadcast>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/broadcasts/{broadcast_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(broadcastResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
