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
import { AwssnsConfigCollection, awssnsConfigCollectionResponse } from './models/awssns-config-collection.js';
import {
  AwssnsConfigPayload,
  awssnsConfigPayloadRequest,
  awssnsConfigPayloadResponse,
} from './models/awssns-config-payload.js';
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
import { SlackConfigCollection, slackConfigCollectionResponse } from './models/slack-config-collection.js';
import {
  SlackConfigPayload,
  slackConfigPayloadRequest,
  slackConfigPayloadResponse,
} from './models/slack-config-payload.js';
import { StripeConfigCollection, stripeConfigCollectionResponse } from './models/stripe-config-collection.js';
import {
  StripeConfigPayload,
  stripeConfigPayloadRequest,
  stripeConfigPayloadResponse,
} from './models/stripe-config-payload.js';
import { TemplatesConfigCollection, templatesConfigCollectionResponse } from './models/templates-config-collection.js';
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
import { ListIntegrationsParams } from './request-params.js';

export class IntegrationsService extends BaseService {
  /**
   * Lists all available and configured integrations for the project. Returns a summary of each integration including its type, status, and basic configuration information.
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<IntegrationConfigCollection>>} OK
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
   * Retrieves the current apns integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ApnsConfigCollection>>} OK
   */
  async getApnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ApnsConfigCollection>> {
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
   * Creates or updates a apns integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ApnsConfigPayload>>} OK
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
   * Removes a apns integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteApnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific apns integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteApnsIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/apns/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current awssns integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<AwssnsConfigCollection>>} OK
   */
  async getAwssnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<AwssnsConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/awssns')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: awssnsConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<AwssnsConfigCollection>(request);
  }

  /**
   * Creates or updates a awssns integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<AwssnsConfigPayload>>} OK
   */
  async saveAwssnsIntegration(
    body: AwssnsConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<AwssnsConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/awssns')
      .setRequestSchema(awssnsConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: awssnsConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<AwssnsConfigPayload>(request);
  }

  /**
   * Removes a awssns integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteAwssnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/awssns')
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific awssns integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteAwssnsIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/awssns/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current eventsource integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<EventSourceConfigCollection>>} OK
   */
  async getEventsourceIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<EventSourceConfigCollection>> {
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
   * Creates or updates a eventsource integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<EventSourceConfigPayload>>} OK
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
   * Removes a eventsource integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteEventsourceIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific eventsource integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteEventsourceIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/eventsource/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current expo integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ExpoConfigCollection>>} OK
   */
  async getExpoIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ExpoConfigCollection>> {
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
   * Creates or updates a expo integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ExpoConfigPayload>>} OK
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
   * Removes a expo integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteExpoIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific expo integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteExpoIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/expo/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current fcm integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<FcmConfigCollection>>} OK
   */
  async getFcmIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<FcmConfigCollection>> {
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
   * Creates or updates a fcm integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<FcmConfigPayload>>} OK
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
   * Removes a fcm integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteFcmIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific fcm integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteFcmIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/fcm/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current github integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<GithubConfigCollection>>} OK
   */
  async getGithubIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<GithubConfigCollection>> {
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
   * Creates or updates a github integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<GithubConfigPayload>>} OK
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
   * Removes a github integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteGithubIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific github integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteGithubIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/github/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxConfigCollection>>} OK
   */
  async getInboxIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfigCollection>> {
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
   * Creates or updates a inbox integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxConfigPayload>>} OK
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
   * Removes a inbox integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteInboxIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific inbox integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteInboxIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/inbox/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<MailgunConfigCollection>>} OK
   */
  async getMailgunIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<MailgunConfigCollection>> {
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
   * Creates or updates a mailgun integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<MailgunConfigPayload>>} OK
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
   * Removes a mailgun integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteMailgunIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific mailgun integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteMailgunIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/mailgun/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current ping_email integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<PingConfigCollection>>} OK
   */
  async getPingEmailIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<PingConfigCollection>> {
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
   * Creates or updates a ping_email integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<PingConfigPayload>>} OK
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
   * Removes a ping_email integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deletePingEmailIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific ping_email integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deletePingEmailIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ping_email/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current sendgrid integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SendgridConfigCollection>>} OK
   */
  async getSendgridIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<SendgridConfigCollection>> {
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
   * Creates or updates a sendgrid integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SendgridConfigPayload>>} OK
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
   * Removes a sendgrid integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSendgridIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific sendgrid integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSendgridIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/sendgrid/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current ses integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SesConfigCollection>>} OK
   */
  async getSesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<SesConfigCollection>> {
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
   * Creates or updates a ses integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SesConfigPayload>>} OK
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
   * Removes a ses integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific ses integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSesIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ses/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current slack integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackConfigCollection>>} OK
   */
  async getSlackIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<SlackConfigCollection>> {
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
   * Creates or updates a slack integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackConfigPayload>>} OK
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
   * Removes a slack integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSlackIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific slack integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSlackIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/slack/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current stripe integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<StripeConfigCollection>>} OK
   */
  async getStripeIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<StripeConfigCollection>> {
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
   * Creates or updates a stripe integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<StripeConfigPayload>>} OK
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
   * Removes a stripe integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteStripeIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific stripe integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteStripeIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/stripe/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current templates integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TemplatesConfigCollection>>} OK
   */
  async getTemplatesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<TemplatesConfigCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/templates')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: templatesConfigCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<TemplatesConfigCollection>(request);
  }

  /**
   * Creates or updates a templates integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} OK
   */
  async saveTemplatesIntegration(body: any, requestConfig?: RequestConfig): Promise<HttpResponse<any>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/templates')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: z.any(),
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<any>(request);
  }

  /**
   * Removes a templates integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTemplatesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/templates')
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific templates integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTemplatesIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/templates/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TwilioConfigCollection>>} OK
   */
  async getTwilioIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<TwilioConfigCollection>> {
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
   * Creates or updates a twilio integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TwilioConfigPayload>>} OK
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
   * Removes a twilio integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTwilioIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific twilio integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTwilioIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/twilio/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Retrieves the current web_push integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebpushConfigCollection>>} OK
   */
  async getWebPushIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<WebpushConfigCollection>> {
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
   * Creates or updates a web_push integration for the project. Only administrators can configure integrations.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebpushConfigPayload>>} OK
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
   * Removes a web_push integration configuration from the project. This will disable the integration's functionality within the project.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteWebPushIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
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
      .build();
    return this.client.call<void>(request);
  }

  /**
   * Removes a specific web_push integration instance by ID from the project.
   * @param {string} id -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteWebPushIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<void>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/web_push/{id}')
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
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<void>(request);
  }
}
