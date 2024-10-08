import { z } from 'zod';

import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { AccessToken, accessTokenResponse } from './models/access-token.js';
import { CreateProjectTokenRequest, createProjectTokenRequestRequest } from './models/create-project-token-request.js';
import { CreateUserTokenRequest, createUserTokenRequestRequest } from './models/create-user-token-request.js';
import { DiscardTokenResponse, discardTokenResponseResponse } from './models/discard-token-response.js';
import { FetchTokensResponse, fetchTokensResponseResponse } from './models/fetch-tokens-response.js';

export class JwtService extends BaseService {
  /**
   *
   * @returns {Promise<HttpResponse<FetchTokensResponse>>} OK
   */
  async fetchProjectTokens(requestConfig?: RequestConfig): Promise<HttpResponse<FetchTokensResponse>> {
    const request = new RequestBuilder<FetchTokensResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/jwt/project')
      .setRequestSchema(z.any())
      .setResponseSchema(fetchTokensResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<FetchTokensResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<AccessToken>>} Created
   */
  async createProjectJwt(
    body: CreateProjectTokenRequest,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<AccessToken>> {
    const request = new RequestBuilder<AccessToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/jwt/project')
      .setRequestSchema(createProjectTokenRequestRequest)
      .setResponseSchema(accessTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<AccessToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardTokenResponse>>} OK
   */
  async discardProjectJwt(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardTokenResponse>> {
    const request = new RequestBuilder<DiscardTokenResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/jwt/project/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardTokenResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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

  /**
   *
   * @returns {Promise<HttpResponse<AccessToken>>} Created
   */
  async createUserJwt(body: CreateUserTokenRequest, requestConfig?: RequestConfig): Promise<HttpResponse<AccessToken>> {
    const request = new RequestBuilder<AccessToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/jwt/user')
      .setRequestSchema(createUserTokenRequestRequest)
      .setResponseSchema(accessTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<AccessToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardTokenResponse>>} OK
   */
  async discardUserJwt(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardTokenResponse>> {
    const request = new RequestBuilder<DiscardTokenResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/jwt/user/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardTokenResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<FetchTokensResponse>>} OK
   */
  async fetchUserTokens(userId: string, requestConfig?: RequestConfig): Promise<HttpResponse<FetchTokensResponse>> {
    const request = new RequestBuilder<FetchTokensResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/jwt/user/{user_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(fetchTokensResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<FetchTokensResponse>(request);
  }
}
