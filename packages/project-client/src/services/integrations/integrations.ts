import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { ApnsConfig, apnsConfigRequest, apnsConfigResponse } from './models/apns-config.js';
import { ArrayOfApnsConfigObjects, arrayOfApnsConfigObjectsResponse } from './models/array-of-apns-config-objects.js';
import {
  ArrayOfAwssnsConfigObjects,
  arrayOfAwssnsConfigObjectsResponse,
} from './models/array-of-awssns-config-objects.js';
import { ArrayOfExpoConfigObjects, arrayOfExpoConfigObjectsResponse } from './models/array-of-expo-config-objects.js';
import { ArrayOfFcmConfigObjects, arrayOfFcmConfigObjectsResponse } from './models/array-of-fcm-config-objects.js';
import {
  ArrayOfGithubConfigObjects,
  arrayOfGithubConfigObjectsResponse,
} from './models/array-of-github-config-objects.js';
import {
  ArrayOfInboxConfigObjects,
  arrayOfInboxConfigObjectsResponse,
} from './models/array-of-inbox-config-objects.js';
import { ArrayOfIntegrationObjects, arrayOfIntegrationObjectsResponse } from './models/array-of-integration-objects.js';
import {
  ArrayOfMailgunConfigObjects,
  arrayOfMailgunConfigObjectsResponse,
} from './models/array-of-mailgun-config-objects.js';
import { ArrayOfPingConfigObjects, arrayOfPingConfigObjectsResponse } from './models/array-of-ping-config-objects.js';
import {
  ArrayOfSendgridConfigObjects,
  arrayOfSendgridConfigObjectsResponse,
} from './models/array-of-sendgrid-config-objects.js';
import { ArrayOfSesConfigObjects, arrayOfSesConfigObjectsResponse } from './models/array-of-ses-config-objects.js';
import {
  ArrayOfSlackConfigObjects,
  arrayOfSlackConfigObjectsResponse,
} from './models/array-of-slack-config-objects.js';
import {
  ArrayOfStripeConfigObjects,
  arrayOfStripeConfigObjectsResponse,
} from './models/array-of-stripe-config-objects.js';
import {
  ArrayOfTemplatesConfigObjects,
  arrayOfTemplatesConfigObjectsResponse,
} from './models/array-of-templates-config-objects.js';
import {
  ArrayOfTwilioConfigObjects,
  arrayOfTwilioConfigObjectsResponse,
} from './models/array-of-twilio-config-objects.js';
import {
  ArrayOfWebpushConfigObjects,
  arrayOfWebpushConfigObjectsResponse,
} from './models/array-of-webpush-config-objects.js';
import { AwssnsConfig, awssnsConfigRequest, awssnsConfigResponse } from './models/awssns-config.js';
import { ExpoConfig, expoConfigRequest, expoConfigResponse } from './models/expo-config.js';
import { FcmConfig, fcmConfigRequest, fcmConfigResponse } from './models/fcm-config.js';
import { GithubConfig, githubConfigRequest, githubConfigResponse } from './models/github-config.js';
import { InboxConfig, inboxConfigRequest, inboxConfigResponse } from './models/inbox-config.js';
import { MailgunConfig, mailgunConfigRequest, mailgunConfigResponse } from './models/mailgun-config.js';
import { PingConfig, pingConfigRequest, pingConfigResponse } from './models/ping-config.js';
import { SendgridConfig, sendgridConfigRequest, sendgridConfigResponse } from './models/sendgrid-config.js';
import { SesConfig, sesConfigRequest, sesConfigResponse } from './models/ses-config.js';
import { SlackConfig, slackConfigRequest, slackConfigResponse } from './models/slack-config.js';
import { StripeConfig, stripeConfigRequest, stripeConfigResponse } from './models/stripe-config.js';
import { TwilioConfig, twilioConfigRequest, twilioConfigResponse } from './models/twilio-config.js';
import { WebpushConfig, webpushConfigRequest, webpushConfigResponse } from './models/webpush-config.js';
import { ListIntegrationsParams } from './request-params.js';

export class IntegrationsService extends BaseService {
  /**
   * Lists all available and configured integrations for the project. Returns a summary of each integration including its type, status, and basic configuration information.
   * @param {number} [pageSize] -
   * @param {string} [pageAfter] -
   * @param {string} [pageBefore] -
   * @returns {Promise<HttpResponse<ArrayOfIntegrationObjects>>} OK
   */
  async listIntegrations(
    params?: ListIntegrationsParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayOfIntegrationObjects>> {
    const request = new RequestBuilder<ArrayOfIntegrationObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfIntegrationObjectsResponse)
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
    return this.client.call<ArrayOfIntegrationObjects>(request);
  }

  /**
   * Retrieves the current apns integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfApnsConfigObjects>>} OK
   */
  async getApnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfApnsConfigObjects>> {
    const request = new RequestBuilder<ArrayOfApnsConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/apns')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfApnsConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfApnsConfigObjects>(request);
  }

  /**
   * Creates or updates a apns integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<ApnsConfig>>} OK
   */
  async saveApnsIntegration(body: ApnsConfig, requestConfig?: RequestConfig): Promise<HttpResponse<ApnsConfig>> {
    const request = new RequestBuilder<ApnsConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/apns')
      .setRequestSchema(apnsConfigRequest)
      .setResponseSchema(apnsConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ApnsConfig>(request);
  }

  /**
   * Removes a apns integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteApnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/apns')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific apns integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteApnsIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/apns/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current awssns integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfAwssnsConfigObjects>>} OK
   */
  async getAwssnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfAwssnsConfigObjects>> {
    const request = new RequestBuilder<ArrayOfAwssnsConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/awssns')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfAwssnsConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfAwssnsConfigObjects>(request);
  }

  /**
   * Creates or updates a awssns integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<AwssnsConfig>>} OK
   */
  async saveAwssnsIntegration(body: AwssnsConfig, requestConfig?: RequestConfig): Promise<HttpResponse<AwssnsConfig>> {
    const request = new RequestBuilder<AwssnsConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/awssns')
      .setRequestSchema(awssnsConfigRequest)
      .setResponseSchema(awssnsConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<AwssnsConfig>(request);
  }

  /**
   * Removes a awssns integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteAwssnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/awssns')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific awssns integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteAwssnsIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/awssns/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current expo integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfExpoConfigObjects>>} OK
   */
  async getExpoIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfExpoConfigObjects>> {
    const request = new RequestBuilder<ArrayOfExpoConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/expo')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfExpoConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfExpoConfigObjects>(request);
  }

  /**
   * Creates or updates a expo integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<ExpoConfig>>} OK
   */
  async saveExpoIntegration(body: ExpoConfig, requestConfig?: RequestConfig): Promise<HttpResponse<ExpoConfig>> {
    const request = new RequestBuilder<ExpoConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/expo')
      .setRequestSchema(expoConfigRequest)
      .setResponseSchema(expoConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ExpoConfig>(request);
  }

  /**
   * Removes a expo integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteExpoIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/expo')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific expo integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteExpoIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/expo/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current fcm integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfFcmConfigObjects>>} OK
   */
  async getFcmIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfFcmConfigObjects>> {
    const request = new RequestBuilder<ArrayOfFcmConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/fcm')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfFcmConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfFcmConfigObjects>(request);
  }

  /**
   * Creates or updates a fcm integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<FcmConfig>>} OK
   */
  async saveFcmIntegration(body: FcmConfig, requestConfig?: RequestConfig): Promise<HttpResponse<FcmConfig>> {
    const request = new RequestBuilder<FcmConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/fcm')
      .setRequestSchema(fcmConfigRequest)
      .setResponseSchema(fcmConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<FcmConfig>(request);
  }

  /**
   * Removes a fcm integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteFcmIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/fcm')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific fcm integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteFcmIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/fcm/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current github integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfGithubConfigObjects>>} OK
   */
  async getGithubIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfGithubConfigObjects>> {
    const request = new RequestBuilder<ArrayOfGithubConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/github')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfGithubConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfGithubConfigObjects>(request);
  }

  /**
   * Creates or updates a github integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<GithubConfig>>} OK
   */
  async saveGithubIntegration(body: GithubConfig, requestConfig?: RequestConfig): Promise<HttpResponse<GithubConfig>> {
    const request = new RequestBuilder<GithubConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/github')
      .setRequestSchema(githubConfigRequest)
      .setResponseSchema(githubConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<GithubConfig>(request);
  }

  /**
   * Removes a github integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteGithubIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/github')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific github integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteGithubIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/github/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfInboxConfigObjects>>} OK
   */
  async getInboxIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfInboxConfigObjects>> {
    const request = new RequestBuilder<ArrayOfInboxConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/inbox')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfInboxConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfInboxConfigObjects>(request);
  }

  /**
   * Creates or updates a inbox integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<InboxConfig>>} OK
   */
  async saveInboxIntegration(body: InboxConfig, requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfig>> {
    const request = new RequestBuilder<InboxConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/inbox')
      .setRequestSchema(inboxConfigRequest)
      .setResponseSchema(inboxConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<InboxConfig>(request);
  }

  /**
   * Removes a inbox integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteInboxIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/inbox')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific inbox integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteInboxIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/inbox/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfMailgunConfigObjects>>} OK
   */
  async getMailgunIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfMailgunConfigObjects>> {
    const request = new RequestBuilder<ArrayOfMailgunConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/mailgun')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfMailgunConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfMailgunConfigObjects>(request);
  }

  /**
   * Creates or updates a mailgun integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<MailgunConfig>>} OK
   */
  async saveMailgunIntegration(
    body: MailgunConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<MailgunConfig>> {
    const request = new RequestBuilder<MailgunConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/mailgun')
      .setRequestSchema(mailgunConfigRequest)
      .setResponseSchema(mailgunConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<MailgunConfig>(request);
  }

  /**
   * Removes a mailgun integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteMailgunIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/mailgun')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific mailgun integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteMailgunIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/mailgun/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current ping_email integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfPingConfigObjects>>} OK
   */
  async getPingEmailIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfPingConfigObjects>> {
    const request = new RequestBuilder<ArrayOfPingConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/ping_email')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfPingConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfPingConfigObjects>(request);
  }

  /**
   * Creates or updates a ping_email integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<PingConfig>>} OK
   */
  async savePingEmailIntegration(body: PingConfig, requestConfig?: RequestConfig): Promise<HttpResponse<PingConfig>> {
    const request = new RequestBuilder<PingConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/ping_email')
      .setRequestSchema(pingConfigRequest)
      .setResponseSchema(pingConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<PingConfig>(request);
  }

  /**
   * Removes a ping_email integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deletePingEmailIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ping_email')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific ping_email integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deletePingEmailIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ping_email/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current sendgrid integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfSendgridConfigObjects>>} OK
   */
  async getSendgridIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfSendgridConfigObjects>> {
    const request = new RequestBuilder<ArrayOfSendgridConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfSendgridConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfSendgridConfigObjects>(request);
  }

  /**
   * Creates or updates a sendgrid integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<SendgridConfig>>} OK
   */
  async saveSendgridIntegration(
    body: SendgridConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SendgridConfig>> {
    const request = new RequestBuilder<SendgridConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(sendgridConfigRequest)
      .setResponseSchema(sendgridConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SendgridConfig>(request);
  }

  /**
   * Removes a sendgrid integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSendgridIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific sendgrid integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSendgridIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/sendgrid/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current ses integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfSesConfigObjects>>} OK
   */
  async getSesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfSesConfigObjects>> {
    const request = new RequestBuilder<ArrayOfSesConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/ses')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfSesConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfSesConfigObjects>(request);
  }

  /**
   * Creates or updates a ses integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<SesConfig>>} OK
   */
  async saveSesIntegration(body: SesConfig, requestConfig?: RequestConfig): Promise<HttpResponse<SesConfig>> {
    const request = new RequestBuilder<SesConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/ses')
      .setRequestSchema(sesConfigRequest)
      .setResponseSchema(sesConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SesConfig>(request);
  }

  /**
   * Removes a ses integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ses')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific ses integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSesIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/ses/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current slack integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfSlackConfigObjects>>} OK
   */
  async getSlackIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfSlackConfigObjects>> {
    const request = new RequestBuilder<ArrayOfSlackConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/slack')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfSlackConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfSlackConfigObjects>(request);
  }

  /**
   * Creates or updates a slack integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<SlackConfig>>} OK
   */
  async saveSlackIntegration(body: SlackConfig, requestConfig?: RequestConfig): Promise<HttpResponse<SlackConfig>> {
    const request = new RequestBuilder<SlackConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/slack')
      .setRequestSchema(slackConfigRequest)
      .setResponseSchema(slackConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackConfig>(request);
  }

  /**
   * Removes a slack integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSlackIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/slack')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific slack integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSlackIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/slack/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current stripe integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfStripeConfigObjects>>} OK
   */
  async getStripeIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfStripeConfigObjects>> {
    const request = new RequestBuilder<ArrayOfStripeConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/stripe')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfStripeConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfStripeConfigObjects>(request);
  }

  /**
   * Creates or updates a stripe integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<StripeConfig>>} OK
   */
  async saveStripeIntegration(body: StripeConfig, requestConfig?: RequestConfig): Promise<HttpResponse<StripeConfig>> {
    const request = new RequestBuilder<StripeConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/stripe')
      .setRequestSchema(stripeConfigRequest)
      .setResponseSchema(stripeConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<StripeConfig>(request);
  }

  /**
   * Removes a stripe integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteStripeIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/stripe')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific stripe integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteStripeIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/stripe/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current templates integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfTemplatesConfigObjects>>} OK
   */
  async getTemplatesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfTemplatesConfigObjects>> {
    const request = new RequestBuilder<ArrayOfTemplatesConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/templates')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfTemplatesConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfTemplatesConfigObjects>(request);
  }

  /**
   * Creates or updates a templates integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<any>>} OK
   */
  async saveTemplatesIntegration(body: any, requestConfig?: RequestConfig): Promise<HttpResponse<any>> {
    const request = new RequestBuilder<any>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/templates')
      .setRequestSchema(z.any())
      .setResponseSchema(z.any())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTemplatesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/templates')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific templates integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTemplatesIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/templates/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfTwilioConfigObjects>>} OK
   */
  async getTwilioIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfTwilioConfigObjects>> {
    const request = new RequestBuilder<ArrayOfTwilioConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/twilio')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfTwilioConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfTwilioConfigObjects>(request);
  }

  /**
   * Creates or updates a twilio integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<TwilioConfig>>} OK
   */
  async saveTwilioIntegration(body: TwilioConfig, requestConfig?: RequestConfig): Promise<HttpResponse<TwilioConfig>> {
    const request = new RequestBuilder<TwilioConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/twilio')
      .setRequestSchema(twilioConfigRequest)
      .setResponseSchema(twilioConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<TwilioConfig>(request);
  }

  /**
   * Removes a twilio integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTwilioIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/twilio')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific twilio integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTwilioIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/twilio/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Retrieves the current web_push integration configurations for a specific integration type in the project. Returns configuration details and status information.
   * @returns {Promise<HttpResponse<ArrayOfWebpushConfigObjects>>} OK
   */
  async getWebPushIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayOfWebpushConfigObjects>> {
    const request = new RequestBuilder<ArrayOfWebpushConfigObjects>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/integrations/web_push')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayOfWebpushConfigObjectsResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayOfWebpushConfigObjects>(request);
  }

  /**
   * Creates or updates a web_push integration for the project. Only administrators can configure integrations.
   * @returns {Promise<HttpResponse<WebpushConfig>>} OK
   */
  async saveWebPushIntegration(
    body: WebpushConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebpushConfig>> {
    const request = new RequestBuilder<WebpushConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/integrations/web_push')
      .setRequestSchema(webpushConfigRequest)
      .setResponseSchema(webpushConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<WebpushConfig>(request);
  }

  /**
   * Removes a web_push integration configuration from the project. This will disable the integration's functionality within the project.
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteWebPushIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/web_push')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   * Removes a specific web_push integration instance by ID from the project.
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteWebPushIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/integrations/web_push/{id}')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'id',
        value: id,
      })
      .build();
    return this.client.call<undefined>(request);
  }
}
