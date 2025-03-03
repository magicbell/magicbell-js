import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { ArrayOfUsers, arrayOfUsersResponse } from './models/array-of-users.js';
import { ListUsersParams } from './request-params.js';

export class UsersService extends BaseService {
  /**
   *
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ArrayOfUsers>>} OK
   */
  async listUsers(params?: ListUsersParams, requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfUsers>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfUsersResponse,
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
    return this.client.call<ArrayOfUsers>(request);
  }
}
