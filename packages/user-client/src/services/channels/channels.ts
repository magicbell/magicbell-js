import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { WebPushToken, webPushTokenRequest, webPushTokenResponse } from '../common/web-push-token.js';
import { ApnsToken, apnsTokenRequest, apnsTokenResponse } from './models/apns-token.js';
import { ApnsTokenResponse1, apnsTokenResponse1Response } from './models/apns-token-response-1.js';
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
import { DiscardResult, discardResultResponse } from './models/discard-result.js';
import { ExpoToken, expoTokenRequest, expoTokenResponse } from './models/expo-token.js';
import { ExpoTokenResponse1, expoTokenResponse1Response } from './models/expo-token-response-1.js';
import { FcmToken, fcmTokenRequest, fcmTokenResponse } from './models/fcm-token.js';
import { FcmTokenResponse1, fcmTokenResponse1Response } from './models/fcm-token-response-1.js';
import { SlackToken, slackTokenRequest, slackTokenResponse } from './models/slack-token.js';
import { SlackTokenResponse1, slackTokenResponse1Response } from './models/slack-token-response-1.js';
import { TeamsToken, teamsTokenRequest, teamsTokenResponse } from './models/teams-token.js';
import { TeamsTokenResponse1, teamsTokenResponse1Response } from './models/teams-token-response-1.js';
import { WebPushTokenResponse, webPushTokenResponseResponse } from './models/web-push-token-response.js';
import {
  GetMobilePushApnsTokensParams,
  GetMobilePushExpoTokensParams,
  GetMobilePushFcmTokensParams,
  GetSlackTokensParams,
  GetTeamsTokensParams,
  GetWebPushTokensParams,
} from './request-params.js';

export class ChannelsService extends BaseService {
  /**
   * Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfApnsTokenResponses>>} OK
   */
  async getMobilePushApnsTokens(
    params?: GetMobilePushApnsTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfApnsTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/apns/tokens')
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
   * Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<ApnsToken>>} Created
   */
  async saveMobilePushApnsToken(body: ApnsToken, requestConfig?: RequestConfig): Promise<HttpResponse<ApnsToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/apns/tokens')
      .setRequestSchema(apnsTokenRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ApnsToken>(request);
  }

  /**
   * Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ApnsTokenResponse1>>} OK
   */
  async getMobilePushApnsToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsTokenResponse1>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsTokenResponse1Response,
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
    return this.client.call<ApnsTokenResponse1>(request);
  }

  /**
   * Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushApnsToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/apns/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfExpoTokenResponses>>} OK
   */
  async getMobilePushExpoTokens(
    params?: GetMobilePushExpoTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfExpoTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/expo/tokens')
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
   * Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<ExpoToken>>} Created
   */
  async saveMobilePushExpoToken(body: ExpoToken, requestConfig?: RequestConfig): Promise<HttpResponse<ExpoToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/expo/tokens')
      .setRequestSchema(expoTokenRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ExpoToken>(request);
  }

  /**
   * Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ExpoTokenResponse1>>} OK
   */
  async getMobilePushExpoToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoTokenResponse1>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoTokenResponse1Response,
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
    return this.client.call<ExpoTokenResponse1>(request);
  }

  /**
   * Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushExpoToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/expo/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfFcmTokenResponses>>} OK
   */
  async getMobilePushFcmTokens(
    params?: GetMobilePushFcmTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfFcmTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/fcm/tokens')
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
   * Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<FcmToken>>} Created
   */
  async saveMobilePushFcmToken(body: FcmToken, requestConfig?: RequestConfig): Promise<HttpResponse<FcmToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/fcm/tokens')
      .setRequestSchema(fcmTokenRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<FcmToken>(request);
  }

  /**
   * Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<FcmTokenResponse1>>} OK
   */
  async getMobilePushFcmToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmTokenResponse1>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmTokenResponse1Response,
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
    return this.client.call<FcmTokenResponse1>(request);
  }

  /**
   * Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushFcmToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/fcm/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all slack tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfSlackTokenResponses>>} OK
   */
  async getSlackTokens(
    params?: GetSlackTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfSlackTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/slack/tokens')
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
   * Saves a slack token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<SlackToken>>} Created
   */
  async saveSlackToken(body: SlackToken, requestConfig?: RequestConfig): Promise<HttpResponse<SlackToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/slack/tokens')
      .setRequestSchema(slackTokenRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackToken>(request);
  }

  /**
   * Retrieves details of a specific slack token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<SlackTokenResponse1>>} OK
   */
  async getSlackToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<SlackTokenResponse1>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackTokenResponse1Response,
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
    return this.client.call<SlackTokenResponse1>(request);
  }

  /**
   * Revokes one of the authenticated user's slack tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardSlackToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/slack/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all teams tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfTeamsTokenResponses>>} OK
   */
  async getTeamsTokens(
    params?: GetTeamsTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfTeamsTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/teams/tokens')
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
   * Saves a teams token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<TeamsToken>>} Created
   */
  async saveTeamsToken(body: TeamsToken, requestConfig?: RequestConfig): Promise<HttpResponse<TeamsToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/teams/tokens')
      .setRequestSchema(teamsTokenRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: teamsTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<TeamsToken>(request);
  }

  /**
   * Retrieves details of a specific teams token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<TeamsTokenResponse1>>} OK
   */
  async getTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<TeamsTokenResponse1>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: teamsTokenResponse1Response,
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
    return this.client.call<TeamsTokenResponse1>(request);
  }

  /**
   * Revokes one of the authenticated user's teams tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/teams/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all web_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfWebPushTokenResponses>>} OK
   */
  async getWebPushTokens(
    params?: GetWebPushTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfWebPushTokenResponses>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/web_push/tokens')
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
   * Saves a web_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<WebPushToken>>} Created
   */
  async saveWebPushToken(body: WebPushToken, requestConfig?: RequestConfig): Promise<HttpResponse<WebPushToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/web_push/tokens')
      .setRequestSchema(webPushTokenRequest)
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webPushTokenResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<WebPushToken>(request);
  }

  /**
   * Retrieves details of a specific web_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<WebPushTokenResponse>>} OK
   */
  async getWebPushToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<WebPushTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/web_push/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<WebPushTokenResponse>(request);
  }

  /**
   * Revokes one of the authenticated user's web_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardWebPushToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/web_push/tokens/{token_id}')
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
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }
}
