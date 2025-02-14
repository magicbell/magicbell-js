import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { AccessToken, accessTokenResponse } from './models/access-token.js';
import {
  ArrayOfFetchTokensResponseTokens,
  arrayOfFetchTokensResponseTokensResponse,
} from './models/array-of-fetch-tokens-response-tokens.js';
import { CreateProjectTokenRequest, createProjectTokenRequestRequest } from './models/create-project-token-request.js';
import { CreateUserTokenRequest, createUserTokenRequestRequest } from './models/create-user-token-request.js';
import { DiscardTokenResponse, discardTokenResponseResponse } from './models/discard-token-response.js';
import { FetchProjectTokensParams, FetchUserTokensParams } from './request-params.js';

export class JwtService extends BaseService {
  /**
   * Retrieves a list of all active project-level JWT tokens. Returns a paginated list showing token metadata including creation date, last used date, and expiration time. For security reasons, the actual token values are not included in the response.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfFetchTokensResponseTokens>>} OK
   */
  async fetchProjectTokens(
    params?: FetchProjectTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfFetchTokensResponseTokens>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/jwt/project')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfFetchTokensResponseTokensResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'page[size]',
        value: params?.pageSize,
      })
      .addQueryParam({
        key: 'page[after]',
        value: params?.pageAfter,
      })
      .addQueryParam({
        key: 'page[before]',
        value: params?.pageBefore,
      })
      .build();
    return this.client.call<ArrayOfFetchTokensResponseTokens>(request);
  }

  /**
   * Creates a new project-level JWT token. These tokens provide project-wide access and should be carefully managed. Only administrators can create project tokens. The returned token should be securely stored as it cannot be retrieved again after creation.
   * @returns {Promise<HttpResponse<AccessToken>>} Created
   */
  async createProjectJwt(
    body: CreateProjectTokenRequest,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<AccessToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/jwt/project')
      .setRequestSchema(createProjectTokenRequestRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: accessTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<AccessToken>(request);
  }

  /**
   * Immediately revokes a project-level JWT token. Once revoked, any requests using this token will be rejected. This action is immediate and cannot be undone. Active sessions using this token will be terminated.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardTokenResponse>>} OK
   */
  async discardProjectJwt(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/jwt/project/{token_id}')
      .setRequestSchema(z.any())
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

  /**
   * Issues a new user-specific JWT token. These tokens are scoped to individual user permissions and access levels. Only administrators can create user tokens. The token is returned only once at creation time and cannot be retrieved later.
   * @returns {Promise<HttpResponse<AccessToken>>} Created
   */
  async createUserJwt(body: CreateUserTokenRequest, requestConfig?: RequestConfig): Promise<HttpResponse<AccessToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/jwt/user')
      .setRequestSchema(createUserTokenRequestRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: accessTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<AccessToken>(request);
  }

  /**
   * Revokes a specific user's JWT token. This immediately invalidates the token and terminates any active sessions using it. This action cannot be undone. Administrators should use this to revoke access when needed for security purposes.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardTokenResponse>>} OK
   */
  async discardUserJwt(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/jwt/user/{token_id}')
      .setRequestSchema(z.any())
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

  /**
   * Lists all JWT tokens associated with a specific user. Returns token metadata including creation time, last access time, and expiration date. Administrators can use this to audit user token usage and manage active sessions. Token values are not included in the response for security reasons.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfFetchTokensResponseTokens>>} OK
   */
  async fetchUserTokens(
    userId: string,
    params?: FetchUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfFetchTokensResponseTokens>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/jwt/user/{user_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfFetchTokensResponseTokensResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'page[size]',
        value: params?.pageSize,
      })
      .addQueryParam({
        key: 'page[after]',
        value: params?.pageAfter,
      })
      .addQueryParam({
        key: 'page[before]',
        value: params?.pageBefore,
      })
      .build();
    return this.client.call<ArrayOfFetchTokensResponseTokens>(request);
  }
}
