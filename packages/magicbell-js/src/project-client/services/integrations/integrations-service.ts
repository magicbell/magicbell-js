import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { ThrowableError } from '../../http/errors/throwable-error.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { ApnsConfigCollection, apnsConfigCollectionResponse } from './models/apns-config-collection.js';
import {
  ApnsConfigPayload,
  apnsConfigPayloadRequest,
  apnsConfigPayloadResponse,
} from './models/apns-config-payload.js';
import {
  EventSourceConfigCollection,
  eventSourceConfigCollectionResponse,
} from './models/event-source-config-collection.js';
import {
  EventSourceConfigPayload,
  eventSourceConfigPayloadRequest,
  eventSourceConfigPayloadResponse,
} from './models/event-source-config-payload.js';
import { ExpoConfigCollection, expoConfigCollectionResponse } from './models/expo-config-collection.js';
import {
  ExpoConfigPayload,
  expoConfigPayloadRequest,
  expoConfigPayloadResponse,
} from './models/expo-config-payload.js';
import { FcmConfigCollection, fcmConfigCollectionResponse } from './models/fcm-config-collection.js';
import { FcmConfigPayload, fcmConfigPayloadRequest, fcmConfigPayloadResponse } from './models/fcm-config-payload.js';
import { GithubConfigCollection, githubConfigCollectionResponse } from './models/github-config-collection.js';
import {
  GithubConfigPayload,
  githubConfigPayloadRequest,
  githubConfigPayloadResponse,
} from './models/github-config-payload.js';
import { InboxConfigCollection, inboxConfigCollectionResponse } from './models/inbox-config-collection.js';
import {
  InboxConfigPayload,
  inboxConfigPayloadRequest,
  inboxConfigPayloadResponse,
} from './models/inbox-config-payload.js';
import {
  IntegrationConfigCollection,
  integrationConfigCollectionResponse,
} from './models/integration-config-collection.js';
import { MailgunConfigCollection, mailgunConfigCollectionResponse } from './models/mailgun-config-collection.js';
import {
  MailgunConfigPayload,
  mailgunConfigPayloadRequest,
  mailgunConfigPayloadResponse,
} from './models/mailgun-config-payload.js';
import { PingConfigCollection, pingConfigCollectionResponse } from './models/ping-config-collection.js';
import {
  PingConfigPayload,
  pingConfigPayloadRequest,
  pingConfigPayloadResponse,
} from './models/ping-config-payload.js';
import { SendgridConfigCollection, sendgridConfigCollectionResponse } from './models/sendgrid-config-collection.js';
import {
  SendgridConfigPayload,
  sendgridConfigPayloadRequest,
  sendgridConfigPayloadResponse,
} from './models/sendgrid-config-payload.js';
import { SesConfigCollection, sesConfigCollectionResponse } from './models/ses-config-collection.js';
import { SesConfigPayload, sesConfigPayloadRequest, sesConfigPayloadResponse } from './models/ses-config-payload.js';
import { SlackBotConfigCollection, slackBotConfigCollectionResponse } from './models/slack-bot-config-collection.js';
import {
  SlackBotConfigPayload,
  slackBotConfigPayloadRequest,
  slackBotConfigPayloadResponse,
} from './models/slack-bot-config-payload.js';
import { SlackConfigCollection, slackConfigCollectionResponse } from './models/slack-config-collection.js';
import {
  SlackConfigPayload,
  slackConfigPayloadRequest,
  slackConfigPayloadResponse,
} from './models/slack-config-payload.js';
import { SmtpConfig, smtpConfigRequest, smtpConfigResponse } from './models/smtp-config.js';
import {
  SmtpConfigObjectCollection,
  smtpConfigObjectCollectionResponse,
} from './models/smtp-config-object-collection.js';
import { StripeConfigCollection, stripeConfigCollectionResponse } from './models/stripe-config-collection.js';
import {
  StripeConfigPayload,
  stripeConfigPayloadRequest,
  stripeConfigPayloadResponse,
} from './models/stripe-config-payload.js';
import { TwilioConfigCollection, twilioConfigCollectionResponse } from './models/twilio-config-collection.js';
import {
  TwilioConfigPayload,
  twilioConfigPayloadRequest,
  twilioConfigPayloadResponse,
} from './models/twilio-config-payload.js';
import { WebpushConfigCollection, webpushConfigCollectionResponse } from './models/webpush-config-collection.js';
import {
  WebpushConfigPayload,
  webpushConfigPayloadRequest,
  webpushConfigPayloadResponse,
} from './models/webpush-config-payload.js';
import {
  DeleteApnsIntegrationParams,
  DeleteEventsourceIntegrationParams,
  DeleteExpoIntegrationParams,
  DeleteFcmIntegrationParams,
  DeleteGithubIntegrationParams,
  DeleteInboxIntegrationParams,
  DeleteMagicbellSlackbotIntegrationParams,
  DeleteMailgunIntegrationParams,
  DeletePingEmailIntegrationParams,
  DeleteSendgridIntegrationParams,
  DeleteSesIntegrationParams,
  DeleteSlackIntegrationParams,
  DeleteSmtpIntegrationParams,
  DeleteStripeIntegrationParams,
  DeleteTwilioIntegrationParams,
  DeleteWebPushIntegrationParams,
  ListIntegrationsParams,
} from './request-params.js';

export class IntegrationsService extends BaseService {
  /**
   * Lists all available and configured integrations for the project. Returns a summary of each integration including its type, status, and basic configuration information.
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<IntegrationConfigCollection>>} - OK
   */
  async listIntegrations(
    params?: ListIntegrationsParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<IntegrationConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: integrationConfigCollectionResponse,
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
    return this.client.call<IntegrationConfigCollection>(request);
  }

  /**
   * Retrieves the current APNs integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ApnsConfigCollection>>} - OK
   */
  async listApnsIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<ApnsConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/apns')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ApnsConfigCollection>(request);
  }

  /**
   * Updates or creates the APNs integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ApnsConfigPayload>>} - OK
   */
  async saveApnsIntegration(
    body: ApnsConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/apns')
      .setRequestSchema(apnsConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ApnsConfigPayload>(request);
  }

  /**
   * Deletes the APNs integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteApnsIntegration(
    params?: DeleteApnsIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/apns')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current EventSource integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<EventSourceConfigCollection>>} - OK
   */
  async listEventsourceIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<EventSourceConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/eventsource')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: eventSourceConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<EventSourceConfigCollection>(request);
  }

  /**
   * Updates or creates the EventSource integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<EventSourceConfigPayload>>} - OK
   */
  async saveEventsourceIntegration(
    body: EventSourceConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<EventSourceConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/eventsource')
      .setRequestSchema(eventSourceConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: eventSourceConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<EventSourceConfigPayload>(request);
  }

  /**
   * Deletes the EventSource integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteEventsourceIntegration(
    params?: DeleteEventsourceIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/eventsource')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Expo integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ExpoConfigCollection>>} - OK
   */
  async listExpoIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<ExpoConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/expo')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ExpoConfigCollection>(request);
  }

  /**
   * Updates or creates the Expo integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ExpoConfigPayload>>} - OK
   */
  async saveExpoIntegration(
    body: ExpoConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/expo')
      .setRequestSchema(expoConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ExpoConfigPayload>(request);
  }

  /**
   * Deletes the Expo integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteExpoIntegration(
    params?: DeleteExpoIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/expo')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current FCM integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<FcmConfigCollection>>} - OK
   */
  async listFcmIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<FcmConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/fcm')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<FcmConfigCollection>(request);
  }

  /**
   * Updates or creates the FCM integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<FcmConfigPayload>>} - OK
   */
  async saveFcmIntegration(
    body: FcmConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/fcm')
      .setRequestSchema(fcmConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<FcmConfigPayload>(request);
  }

  /**
   * Deletes the FCM integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteFcmIntegration(
    params?: DeleteFcmIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/fcm')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current GitHub integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<GithubConfigCollection>>} - OK
   */
  async listGithubIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<GithubConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/github')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: githubConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<GithubConfigCollection>(request);
  }

  /**
   * Updates or creates the GitHub integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<GithubConfigPayload>>} - OK
   */
  async saveGithubIntegration(
    body: GithubConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<GithubConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/github')
      .setRequestSchema(githubConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: githubConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<GithubConfigPayload>(request);
  }

  /**
   * Deletes the GitHub integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteGithubIntegration(
    params?: DeleteGithubIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/github')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxConfigCollection>>} - OK
   */
  async listInboxIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/inbox')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: inboxConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<InboxConfigCollection>(request);
  }

  /**
   * Updates or creates the Inbox integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxConfigPayload>>} - OK
   */
  async saveInboxIntegration(
    body: InboxConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<InboxConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/inbox')
      .setRequestSchema(inboxConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: inboxConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<InboxConfigPayload>(request);
  }

  /**
   * Deletes the Inbox integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteInboxIntegration(
    params?: DeleteInboxIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/inbox')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current MagicBell SlackBot integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackBotConfigCollection>>} - OK
   */
  async listMagicbellSlackbotIntegrations(
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackBotConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/magicbell_slackbot')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackBotConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<SlackBotConfigCollection>(request);
  }

  /**
   * Updates or creates the MagicBell SlackBot integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackBotConfigPayload>>} - OK
   */
  async saveMagicbellSlackbotIntegration(
    body: SlackBotConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackBotConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/magicbell_slackbot')
      .setRequestSchema(slackBotConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackBotConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackBotConfigPayload>(request);
  }

  /**
   * Deletes the MagicBell SlackBot integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteMagicbellSlackbotIntegration(
    params?: DeleteMagicbellSlackbotIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/magicbell_slackbot')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<MailgunConfigCollection>>} - OK
   */
  async listMailgunIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<MailgunConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/mailgun')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: mailgunConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<MailgunConfigCollection>(request);
  }

  /**
   * Updates or creates the Mailgun integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<MailgunConfigPayload>>} - OK
   */
  async saveMailgunIntegration(
    body: MailgunConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<MailgunConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/mailgun')
      .setRequestSchema(mailgunConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: mailgunConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<MailgunConfigPayload>(request);
  }

  /**
   * Deletes the Mailgun integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteMailgunIntegration(
    params?: DeleteMailgunIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/mailgun')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Ping Email integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<PingConfigCollection>>} - OK
   */
  async listPingEmailIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<PingConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/ping_email')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: pingConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<PingConfigCollection>(request);
  }

  /**
   * Updates or creates the Ping Email integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<PingConfigPayload>>} - OK
   */
  async savePingEmailIntegration(
    body: PingConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<PingConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/ping_email')
      .setRequestSchema(pingConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: pingConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<PingConfigPayload>(request);
  }

  /**
   * Deletes the Ping Email integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deletePingEmailIntegration(
    params?: DeletePingEmailIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ping_email')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current SendGrid integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SendgridConfigCollection>>} - OK
   */
  async listSendgridIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<SendgridConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: sendgridConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<SendgridConfigCollection>(request);
  }

  /**
   * Updates or creates the SendGrid integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SendgridConfigPayload>>} - OK
   */
  async saveSendgridIntegration(
    body: SendgridConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SendgridConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(sendgridConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: sendgridConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SendgridConfigPayload>(request);
  }

  /**
   * Deletes the SendGrid integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteSendgridIntegration(
    params?: DeleteSendgridIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Amazon SES integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SesConfigCollection>>} - OK
   */
  async listSesIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<SesConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/ses')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: sesConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<SesConfigCollection>(request);
  }

  /**
   * Updates or creates the Amazon SES integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SesConfigPayload>>} - OK
   */
  async saveSesIntegration(
    body: SesConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SesConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/ses')
      .setRequestSchema(sesConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: sesConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SesConfigPayload>(request);
  }

  /**
   * Deletes the Amazon SES integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteSesIntegration(
    params?: DeleteSesIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ses')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Slack integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackConfigCollection>>} - OK
   */
  async listSlackIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<SlackConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/slack')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<SlackConfigCollection>(request);
  }

  /**
   * Updates or creates the Slack integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackConfigPayload>>} - OK
   */
  async saveSlackIntegration(
    body: SlackConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/slack')
      .setRequestSchema(slackConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackConfigPayload>(request);
  }

  /**
   * Deletes the Slack integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteSlackIntegration(
    params?: DeleteSlackIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/slack')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current SMTP integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SmtpConfigObjectCollection>>} - OK
   */
  async listSmtpIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<SmtpConfigObjectCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/smtp')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: smtpConfigObjectCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<SmtpConfigObjectCollection>(request);
  }

  /**
   * Updates or creates the SMTP integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SmtpConfig>>} - OK
   */
  async saveSmtpIntegration(body: SmtpConfig, requestConfig?: RequestConfig): Promise<HttpResponse<SmtpConfig>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/smtp')
      .setRequestSchema(smtpConfigRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: smtpConfigResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SmtpConfig>(request);
  }

  /**
   * Deletes the SMTP integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteSmtpIntegration(
    params?: DeleteSmtpIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/smtp')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Stripe integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<StripeConfigCollection>>} - OK
   */
  async listStripeIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<StripeConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/stripe')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: stripeConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<StripeConfigCollection>(request);
  }

  /**
   * Updates or creates the Stripe integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<StripeConfigPayload>>} - OK
   */
  async saveStripeIntegration(
    body: StripeConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<StripeConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/stripe')
      .setRequestSchema(stripeConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: stripeConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<StripeConfigPayload>(request);
  }

  /**
   * Deletes the Stripe integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteStripeIntegration(
    params?: DeleteStripeIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/stripe')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TwilioConfigCollection>>} - OK
   */
  async listTwilioIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<TwilioConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/twilio')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: twilioConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<TwilioConfigCollection>(request);
  }

  /**
   * Updates or creates the Twilio integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TwilioConfigPayload>>} - OK
   */
  async saveTwilioIntegration(
    body: TwilioConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TwilioConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/twilio')
      .setRequestSchema(twilioConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: twilioConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<TwilioConfigPayload>(request);
  }

  /**
   * Deletes the Twilio integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteTwilioIntegration(
    params?: DeleteTwilioIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/twilio')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current Web Push integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebpushConfigCollection>>} - OK
   */
  async listWebPushIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<WebpushConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/web_push')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webpushConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<WebpushConfigCollection>(request);
  }

  /**
   * Updates or creates the Web Push integration for the project.
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebpushConfigPayload>>} - OK
   */
  async saveWebPushIntegration(
    body: WebpushConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebpushConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/web_push')
      .setRequestSchema(webpushConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webpushConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<WebpushConfigPayload>(request);
  }

  /**
   * Deletes the Web Push integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {string} [params.id] -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} - No Content
   */
  async deleteWebPushIntegration(
    params?: DeleteWebPushIntegrationParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/web_push')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.undefined(),
        contentType: ContentType.NoContent,
        status: 204,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'id',
        value: params?.id,
      })
      .build();
    return this.client.call<void>(request);
  }
}
