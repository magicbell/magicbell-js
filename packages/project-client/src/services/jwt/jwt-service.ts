import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { ThrowableError } from '../../http/errors/throwable-error.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { AccessTokenCollection, accessTokenCollectionResponse } from './models/access-token-collection.js';
import { CreateProjectTokenRequest, createProjectTokenRequestRequest } from './models/create-project-token-request.js';
import { CreateTokenResponse, createTokenResponseResponse } from './models/create-token-response.js';
import { DiscardTokenResponse, discardTokenResponseResponse } from './models/discard-token-response.js';
import { FetchProjectTokensParams } from './request-params.js';

export class JwtService extends BaseService {
  /**
   * Retrieves a list of all active project-level JWT tokens. Returns a paginated list showing token metadata including creation date, last used date, and expiration time. For security reasons, the actual token values are not included in the response.
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<AccessTokenCollection>>} OK
   */
  async fetchProjectTokens(
    params?: FetchProjectTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<AccessTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/jwt/project')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: accessTokenCollectionResponse,
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
    return this.client.call<AccessTokenCollection>(request);
  }

  /**
   * Creates a new project-level JWT token. These tokens provide project-wide access and should be carefully managed. Only administrators can create project tokens. The returned token should be securely stored as it cannot be retrieved again after creation.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<CreateTokenResponse>>} Created
   */
  async createProjectJwt(
    body: CreateProjectTokenRequest,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CreateTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/jwt/project')
      .setRequestSchema(createProjectTokenRequestRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: createTokenResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<CreateTokenResponse>(request);
  }

  /**
   * Immediately revokes a project-level JWT token. Once revoked, any requests using this token will be rejected. This action is immediate and cannot be undone. Active sessions using this token will be terminated.
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardTokenResponse>>} OK
   */
  async discardProjectJwt(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/jwt/project/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardTokenResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardTokenResponse>(request);
  }
}
