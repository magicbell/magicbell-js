import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { ApnsTokenResponse, apnsTokenResponseResponse } from './models/apns-token-response.js';
import {
  ArrayOfApnsTokenResponses,
  arrayOfApnsTokenResponsesResponse,
} from './models/array-of-apns-token-responses.js';
import {
  ArrayOfExpoTokenResponses,
  arrayOfExpoTokenResponsesResponse,
} from './models/array-of-expo-token-responses.js';
import { ArrayOfFcmTokenResponses, arrayOfFcmTokenResponsesResponse } from './models/array-of-fcm-token-responses.js';
import {
  ArrayOfSlackTokenResponses,
  arrayOfSlackTokenResponsesResponse,
} from './models/array-of-slack-token-responses.js';
import {
  ArrayOfTeamsTokenResponses,
  arrayOfTeamsTokenResponsesResponse,
} from './models/array-of-teams-token-responses.js';
import {
  ArrayOfWebPushTokenResponses,
  arrayOfWebPushTokenResponsesResponse,
} from './models/array-of-web-push-token-responses.js';
import {
  CategoryDeliveryConfig,
  categoryDeliveryConfigRequest,
  categoryDeliveryConfigResponse,
} from './models/category-delivery-config.js';
import { DiscardResult, discardResultResponse } from './models/discard-result.js';
import { ExpoTokenResponse, expoTokenResponseResponse } from './models/expo-token-response.js';
import { FcmTokenResponse, fcmTokenResponseResponse } from './models/fcm-token-response.js';
import { SlackTokenResponse, slackTokenResponseResponse } from './models/slack-token-response.js';
import { TeamsTokenResponse, teamsTokenResponseResponse } from './models/teams-token-response.js';
import { WebPushTokenResponse, webPushTokenResponseResponse } from './models/web-push-token-response.js';
import {
  GetDeliveryconfigParams,
  GetMobilePushApnsUserTokensParams,
  GetMobilePushExpoUserTokensParams,
  GetMobilePushFcmUserTokensParams,
  GetSlackUserTokensParams,
  GetTeamsUserTokensParams,
  GetWebPushUserTokensParams,
} from './request-params.js';

export class ChannelsService extends BaseService {
  /**
   *
   * @param {string} [key] -
   * @returns {Promise<HttpResponse<CategoryDeliveryConfig>>} OK
   */
  async getDeliveryconfig(
    params?: GetDeliveryconfigParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CategoryDeliveryConfig>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/deliveryconfig')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: categoryDeliveryConfigResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'key',
        value: params?.key,
      })
      .build();
    return this.client.call<CategoryDeliveryConfig>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<CategoryDeliveryConfig>>} OK
   */
  async saveDeliveryconfig(
    body: CategoryDeliveryConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CategoryDeliveryConfig>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/channels/deliveryconfig')
      .setRequestSchema(categoryDeliveryConfigRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: categoryDeliveryConfigResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<CategoryDeliveryConfig>(request);
  }

  /**
   * Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfApnsTokenResponses>>} OK
   */
  async getMobilePushApnsUserTokens(
    userId: string,
    params?: GetMobilePushApnsUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfApnsTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfApnsTokenResponsesResponse,
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
    return this.client.call<ArrayOfApnsTokenResponses>(request);
  }

  /**
   * Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ApnsTokenResponse>>} OK
   */
  async getMobilePushApnsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsTokenResponseResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<ApnsTokenResponse>(request);
  }

  /**
   * Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushApnsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfExpoTokenResponses>>} OK
   */
  async getMobilePushExpoUserTokens(
    userId: string,
    params?: GetMobilePushExpoUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfExpoTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfExpoTokenResponsesResponse,
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
    return this.client.call<ArrayOfExpoTokenResponses>(request);
  }

  /**
   * Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ExpoTokenResponse>>} OK
   */
  async getMobilePushExpoUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoTokenResponseResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<ExpoTokenResponse>(request);
  }

  /**
   * Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushExpoUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfFcmTokenResponses>>} OK
   */
  async getMobilePushFcmUserTokens(
    userId: string,
    params?: GetMobilePushFcmUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfFcmTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfFcmTokenResponsesResponse,
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
    return this.client.call<ArrayOfFcmTokenResponses>(request);
  }

  /**
   * Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<FcmTokenResponse>>} OK
   */
  async getMobilePushFcmUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmTokenResponseResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<FcmTokenResponse>(request);
  }

  /**
   * Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushFcmUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfSlackTokenResponses>>} OK
   */
  async getSlackUserTokens(
    userId: string,
    params?: GetSlackUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfSlackTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/slack/tokens')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfSlackTokenResponsesResponse,
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
    return this.client.call<ArrayOfSlackTokenResponses>(request);
  }

  /**
   * Retrieves a specific slack token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<SlackTokenResponse>>} OK
   */
  async getSlackUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackTokenResponseResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<SlackTokenResponse>(request);
  }

  /**
   * Revokes a specific user's slack token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardSlackUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfTeamsTokenResponses>>} OK
   */
  async getTeamsUserTokens(
    userId: string,
    params?: GetTeamsUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfTeamsTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/teams/tokens')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfTeamsTokenResponsesResponse,
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
    return this.client.call<ArrayOfTeamsTokenResponses>(request);
  }

  /**
   * Retrieves a specific teams token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<TeamsTokenResponse>>} OK
   */
  async getTeamsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TeamsTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: teamsTokenResponseResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<TeamsTokenResponse>(request);
  }

  /**
   * Revokes a specific user's teams token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardTeamsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all web_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfWebPushTokenResponses>>} OK
   */
  async getWebPushUserTokens(
    userId: string,
    params?: GetWebPushUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfWebPushTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/web_push/tokens')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: arrayOfWebPushTokenResponsesResponse,
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
    return this.client.call<ArrayOfWebPushTokenResponses>(request);
  }

  /**
   * Retrieves a specific web_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<WebPushTokenResponse>>} OK
   */
  async getWebPushUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webPushTokenResponseResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<WebPushTokenResponse>(request);
  }

  /**
   * Revokes a specific user's web_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardWebPushUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
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
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }
}
