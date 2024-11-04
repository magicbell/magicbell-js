import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { WebPushToken, webPushTokenRequest, webPushTokenResponse } from '../common/web-push-token.js';
import { ApnsToken, apnsTokenRequest, apnsTokenResponse } from './models/apns-token.js';
import {
  ArrayOfMetadataApnsTokens,
  arrayOfMetadataApnsTokensResponse,
} from './models/array-of-metadata-apns-tokens.js';
import {
  ArrayOfMetadataExpoTokens,
  arrayOfMetadataExpoTokensResponse,
} from './models/array-of-metadata-expo-tokens.js';
import { ArrayOfMetadataFcmTokens, arrayOfMetadataFcmTokensResponse } from './models/array-of-metadata-fcm-tokens.js';
import {
  ArrayOfMetadataSlackTokens,
  arrayOfMetadataSlackTokensResponse,
} from './models/array-of-metadata-slack-tokens.js';
import {
  ArrayOfMetadataTeamsTokens,
  arrayOfMetadataTeamsTokensResponse,
} from './models/array-of-metadata-teams-tokens.js';
import {
  ArrayOfMetadataWebPushTokens,
  arrayOfMetadataWebPushTokensResponse,
} from './models/array-of-metadata-web-push-tokens.js';
import { DiscardResult, discardResultResponse } from './models/discard-result.js';
import { ExpoToken, expoTokenRequest, expoTokenResponse } from './models/expo-token.js';
import { FcmToken, fcmTokenRequest, fcmTokenResponse } from './models/fcm-token.js';
import { MetadataApnsToken, metadataApnsTokenResponse } from './models/metadata-apns-token.js';
import { MetadataExpoToken, metadataExpoTokenResponse } from './models/metadata-expo-token.js';
import { MetadataFcmToken, metadataFcmTokenResponse } from './models/metadata-fcm-token.js';
import { MetadataSlackToken, metadataSlackTokenResponse } from './models/metadata-slack-token.js';
import { MetadataTeamsToken, metadataTeamsTokenResponse } from './models/metadata-teams-token.js';
import { MetadataWebPushToken, metadataWebPushTokenResponse } from './models/metadata-web-push-token.js';
import { SlackToken, slackTokenRequest, slackTokenResponse } from './models/slack-token.js';
import { TeamsToken, teamsTokenRequest, teamsTokenResponse } from './models/teams-token.js';
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
   * @returns {Promise<HttpResponse<ArrayOfMetadataApnsTokens>>} OK
   */
  async getMobilePushApnsTokens(
    params?: GetMobilePushApnsTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfMetadataApnsTokens>> {
    const request = new RequestBuilder<ArrayOfMetadataApnsTokens>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/apns/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMetadataApnsTokensResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
    return this.client.call<ArrayOfMetadataApnsTokens>(request);
  }

  /**
   * Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<ApnsToken>>} Created
   */
  async saveMobilePushApnsToken(body: ApnsToken, requestConfig?: RequestConfig): Promise<HttpResponse<ApnsToken>> {
    const request = new RequestBuilder<ApnsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/apns/tokens')
      .setRequestSchema(apnsTokenRequest)
      .setResponseSchema(apnsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<MetadataApnsToken>>} OK
   */
  async getMobilePushApnsToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<MetadataApnsToken>> {
    const request = new RequestBuilder<MetadataApnsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(metadataApnsTokenResponse)
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
    return this.client.call<MetadataApnsToken>(request);
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
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
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
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfMetadataExpoTokens>>} OK
   */
  async getMobilePushExpoTokens(
    params?: GetMobilePushExpoTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfMetadataExpoTokens>> {
    const request = new RequestBuilder<ArrayOfMetadataExpoTokens>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/expo/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMetadataExpoTokensResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
    return this.client.call<ArrayOfMetadataExpoTokens>(request);
  }

  /**
   * Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<ExpoToken>>} Created
   */
  async saveMobilePushExpoToken(body: ExpoToken, requestConfig?: RequestConfig): Promise<HttpResponse<ExpoToken>> {
    const request = new RequestBuilder<ExpoToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/expo/tokens')
      .setRequestSchema(expoTokenRequest)
      .setResponseSchema(expoTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<MetadataExpoToken>>} OK
   */
  async getMobilePushExpoToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<MetadataExpoToken>> {
    const request = new RequestBuilder<MetadataExpoToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(metadataExpoTokenResponse)
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
    return this.client.call<MetadataExpoToken>(request);
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
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
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
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfMetadataFcmTokens>>} OK
   */
  async getMobilePushFcmTokens(
    params?: GetMobilePushFcmTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfMetadataFcmTokens>> {
    const request = new RequestBuilder<ArrayOfMetadataFcmTokens>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/fcm/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMetadataFcmTokensResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
    return this.client.call<ArrayOfMetadataFcmTokens>(request);
  }

  /**
   * Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<FcmToken>>} Created
   */
  async saveMobilePushFcmToken(body: FcmToken, requestConfig?: RequestConfig): Promise<HttpResponse<FcmToken>> {
    const request = new RequestBuilder<FcmToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/fcm/tokens')
      .setRequestSchema(fcmTokenRequest)
      .setResponseSchema(fcmTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<MetadataFcmToken>>} OK
   */
  async getMobilePushFcmToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<MetadataFcmToken>> {
    const request = new RequestBuilder<MetadataFcmToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(metadataFcmTokenResponse)
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
    return this.client.call<MetadataFcmToken>(request);
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
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
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
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all slack tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfMetadataSlackTokens>>} OK
   */
  async getSlackTokens(
    params?: GetSlackTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfMetadataSlackTokens>> {
    const request = new RequestBuilder<ArrayOfMetadataSlackTokens>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/slack/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMetadataSlackTokensResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
    return this.client.call<ArrayOfMetadataSlackTokens>(request);
  }

  /**
   * Saves a slack token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<SlackToken>>} Created
   */
  async saveSlackToken(body: SlackToken, requestConfig?: RequestConfig): Promise<HttpResponse<SlackToken>> {
    const request = new RequestBuilder<SlackToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/slack/tokens')
      .setRequestSchema(slackTokenRequest)
      .setResponseSchema(slackTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<MetadataSlackToken>>} OK
   */
  async getSlackToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<MetadataSlackToken>> {
    const request = new RequestBuilder<MetadataSlackToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(metadataSlackTokenResponse)
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
    return this.client.call<MetadataSlackToken>(request);
  }

  /**
   * Revokes one of the authenticated user's slack tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardSlackToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
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
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all teams tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfMetadataTeamsTokens>>} OK
   */
  async getTeamsTokens(
    params?: GetTeamsTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfMetadataTeamsTokens>> {
    const request = new RequestBuilder<ArrayOfMetadataTeamsTokens>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/teams/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMetadataTeamsTokensResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
    return this.client.call<ArrayOfMetadataTeamsTokens>(request);
  }

  /**
   * Saves a teams token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<TeamsToken>>} Created
   */
  async saveTeamsToken(body: TeamsToken, requestConfig?: RequestConfig): Promise<HttpResponse<TeamsToken>> {
    const request = new RequestBuilder<TeamsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/teams/tokens')
      .setRequestSchema(teamsTokenRequest)
      .setResponseSchema(teamsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<MetadataTeamsToken>>} OK
   */
  async getTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<MetadataTeamsToken>> {
    const request = new RequestBuilder<MetadataTeamsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(metadataTeamsTokenResponse)
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
    return this.client.call<MetadataTeamsToken>(request);
  }

  /**
   * Revokes one of the authenticated user's teams tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
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
    return this.client.call<DiscardResult>(request);
  }

  /**
   * Lists all web_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfMetadataWebPushTokens>>} OK
   */
  async getWebPushTokens(
    params?: GetWebPushTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfMetadataWebPushTokens>> {
    const request = new RequestBuilder<ArrayOfMetadataWebPushTokens>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/web_push/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMetadataWebPushTokensResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
    return this.client.call<ArrayOfMetadataWebPushTokens>(request);
  }

  /**
   * Saves a web_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.
   * @returns {Promise<HttpResponse<WebPushToken>>} Created
   */
  async saveWebPushToken(body: WebPushToken, requestConfig?: RequestConfig): Promise<HttpResponse<WebPushToken>> {
    const request = new RequestBuilder<WebPushToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/web_push/tokens')
      .setRequestSchema(webPushTokenRequest)
      .setResponseSchema(webPushTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<MetadataWebPushToken>>} OK
   */
  async getWebPushToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<MetadataWebPushToken>> {
    const request = new RequestBuilder<MetadataWebPushToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(metadataWebPushTokenResponse)
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
    return this.client.call<MetadataWebPushToken>(request);
  }

  /**
   * Revokes one of the authenticated user's web_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardWebPushToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
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
    return this.client.call<DiscardResult>(request);
  }
}
