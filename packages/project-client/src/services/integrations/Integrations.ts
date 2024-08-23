import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer';
import { RequestBuilder } from '../../http/transport/request-builder';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { BaseService } from '../base-service';
import { ApnsConfig, apnsConfigRequest, apnsConfigResponse } from './models/apns-config';
import { FcmConfig, fcmConfigRequest, fcmConfigResponse } from './models/fcm-config';
import { GithubConfig, githubConfigRequest, githubConfigResponse } from './models/github-config';
import { InboxConfig, inboxConfigRequest, inboxConfigResponse } from './models/inbox-config';
import { ListIntegrationsResponse, listIntegrationsResponseResponse } from './models/list-integrations-response';
import { MailgunConfig, mailgunConfigRequest, mailgunConfigResponse } from './models/mailgun-config';
import { PingConfig, pingConfigRequest, pingConfigResponse } from './models/ping-config';
import { SendgridConfig, sendgridConfigRequest, sendgridConfigResponse } from './models/sendgrid-config';
import { SesConfig, sesConfigRequest, sesConfigResponse } from './models/ses-config';
import { SlackConfig, slackConfigRequest, slackConfigResponse } from './models/slack-config';
import { StripeConfig, stripeConfigRequest, stripeConfigResponse } from './models/stripe-config';
import { TwilioConfig, twilioConfigRequest, twilioConfigResponse } from './models/twilio-config';
import { WebpushConfig, webpushConfigRequest, webpushConfigResponse } from './models/webpush-config';

export class IntegrationsService extends BaseService {
  /**
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async listIntegrations(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getApnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/apns')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ApnsConfig>>} OK
   */
  async saveApnsIntegration(body: ApnsConfig, requestConfig?: RequestConfig): Promise<HttpResponse<ApnsConfig>> {
    const request = new RequestBuilder<ApnsConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteApnsIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteApnsIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getFcmIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/fcm')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<FcmConfig>>} OK
   */
  async saveFcmIntegration(body: FcmConfig, requestConfig?: RequestConfig): Promise<HttpResponse<FcmConfig>> {
    const request = new RequestBuilder<FcmConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteFcmIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteFcmIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getGithubIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/github')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<GithubConfig>>} OK
   */
  async saveGithubIntegration(body: GithubConfig, requestConfig?: RequestConfig): Promise<HttpResponse<GithubConfig>> {
    const request = new RequestBuilder<GithubConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteGithubIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteGithubIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getInboxIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/inbox')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<InboxConfig>>} OK
   */
  async saveInboxIntegration(body: InboxConfig, requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfig>> {
    const request = new RequestBuilder<InboxConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteInboxIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteInboxIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getMailgunIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/mailgun')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<MailgunConfig>>} OK
   */
  async saveMailgunIntegration(
    body: MailgunConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<MailgunConfig>> {
    const request = new RequestBuilder<MailgunConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteMailgunIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteMailgunIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getPingEmailIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/ping_email')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<PingConfig>>} OK
   */
  async savePingEmailIntegration(body: PingConfig, requestConfig?: RequestConfig): Promise<HttpResponse<PingConfig>> {
    const request = new RequestBuilder<PingConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deletePingEmailIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deletePingEmailIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getSendgridIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/sendgrid')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<SendgridConfig>>} OK
   */
  async saveSendgridIntegration(
    body: SendgridConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SendgridConfig>> {
    const request = new RequestBuilder<SendgridConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSendgridIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSendgridIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getSesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/ses')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<SesConfig>>} OK
   */
  async saveSesIntegration(body: SesConfig, requestConfig?: RequestConfig): Promise<HttpResponse<SesConfig>> {
    const request = new RequestBuilder<SesConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSesIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getSlackIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/slack')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<SlackConfig>>} OK
   */
  async saveSlackIntegration(body: SlackConfig, requestConfig?: RequestConfig): Promise<HttpResponse<SlackConfig>> {
    const request = new RequestBuilder<SlackConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSlackIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteSlackIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getStripeIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/stripe')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<StripeConfig>>} OK
   */
  async saveStripeIntegration(body: StripeConfig, requestConfig?: RequestConfig): Promise<HttpResponse<StripeConfig>> {
    const request = new RequestBuilder<StripeConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteStripeIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteStripeIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getTemplatesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/templates')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<any>>} OK
   */
  async saveTemplatesIntegration(body: any, requestConfig?: RequestConfig): Promise<HttpResponse<any>> {
    const request = new RequestBuilder<any>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTemplatesIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTemplatesIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getTwilioIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/twilio')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<TwilioConfig>>} OK
   */
  async saveTwilioIntegration(body: TwilioConfig, requestConfig?: RequestConfig): Promise<HttpResponse<TwilioConfig>> {
    const request = new RequestBuilder<TwilioConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTwilioIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteTwilioIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<ListIntegrationsResponse>>} OK
   */
  async getWebPushIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<ListIntegrationsResponse>> {
    const request = new RequestBuilder<ListIntegrationsResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/integrations/web_push')
      .setRequestSchema(z.any())
      .setResponseSchema(listIntegrationsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ListIntegrationsResponse>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<WebpushConfig>>} OK
   */
  async saveWebPushIntegration(
    body: WebpushConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebpushConfig>> {
    const request = new RequestBuilder<WebpushConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteWebPushIntegration(requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @param {string} id -
   * @returns {Promise<HttpResponse<any>>} No Content
   */
  async deleteWebPushIntegrationById(id: string, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
