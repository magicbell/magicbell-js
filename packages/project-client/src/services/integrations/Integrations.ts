import BaseService from '../../BaseService';
import { ApnsConfig } from './models/ApnsConfig';
import { FcmConfig } from './models/FcmConfig';
import { InboxConfig } from './models/InboxConfig';
import { ListIntegrationsResponse } from './models/ListIntegrationsResponse';
import { MailgunConfig } from './models/MailgunConfig';
import { PingConfig } from './models/PingConfig';
import { SaveApnsIntegrationRequest } from './models/SaveApnsIntegrationRequest';
import { SaveFcmIntegrationRequest } from './models/SaveFcmIntegrationRequest';
import { SaveInboxIntegrationRequest } from './models/SaveInboxIntegrationRequest';
import { SaveMailgunIntegrationRequest } from './models/SaveMailgunIntegrationRequest';
import { SavePingEmailIntegrationRequest } from './models/SavePingEmailIntegrationRequest';
import { SaveSendgridIntegrationRequest } from './models/SaveSendgridIntegrationRequest';
import { SaveSlackIntegrationRequest } from './models/SaveSlackIntegrationRequest';
import { SaveStripeIntegrationRequest } from './models/SaveStripeIntegrationRequest';
import { SaveTemplatesIntegrationRequest } from './models/SaveTemplatesIntegrationRequest';
import { SaveTemplatesIntegrationResponse } from './models/SaveTemplatesIntegrationResponse';
import { SaveTwilioIntegrationRequest } from './models/SaveTwilioIntegrationRequest';
import { SaveWebPushIntegrationRequest } from './models/SaveWebPushIntegrationRequest';
import { SendgridConfig } from './models/SendgridConfig';
import { SlackConfig } from './models/SlackConfig';
import { StripeConfig } from './models/StripeConfig';
import { TwilioConfig } from './models/TwilioConfig';
import { WebpushConfig } from './models/WebpushConfig';

export class IntegrationsService extends BaseService {
  async listIntegrations(): Promise<ListIntegrationsResponse> {
    const urlEndpoint = '/integrations';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ListIntegrationsResponse;
    return responseModel;
  }

  async saveApnsIntegration(input: SaveApnsIntegrationRequest): Promise<ApnsConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/apns';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ApnsConfig;
    return responseModel;
  }

  async deleteApnsIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/apns';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveFcmIntegration(input: SaveFcmIntegrationRequest): Promise<FcmConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/fcm';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as FcmConfig;
    return responseModel;
  }

  async deleteFcmIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/fcm';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveInboxIntegration(input: SaveInboxIntegrationRequest): Promise<InboxConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/inbox';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as InboxConfig;
    return responseModel;
  }

  async deleteInboxIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/inbox';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveMailgunIntegration(input: SaveMailgunIntegrationRequest): Promise<MailgunConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/mailgun';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as MailgunConfig;
    return responseModel;
  }

  async deleteMailgunIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/mailgun';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async savePingEmailIntegration(input: SavePingEmailIntegrationRequest): Promise<PingConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/ping_email';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as PingConfig;
    return responseModel;
  }

  async deletePingEmailIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/ping_email';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveSendgridIntegration(input: SaveSendgridIntegrationRequest): Promise<SendgridConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/sendgrid';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as SendgridConfig;
    return responseModel;
  }

  async deleteSendgridIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/sendgrid';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveSlackIntegration(input: SaveSlackIntegrationRequest): Promise<SlackConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/slack';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as SlackConfig;
    return responseModel;
  }

  async deleteSlackIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/slack';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveStripeIntegration(input: SaveStripeIntegrationRequest): Promise<StripeConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/stripe';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as StripeConfig;
    return responseModel;
  }

  async deleteStripeIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/stripe';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveTemplatesIntegration(input: SaveTemplatesIntegrationRequest): Promise<SaveTemplatesIntegrationResponse> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/templates';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as SaveTemplatesIntegrationResponse;
    return responseModel;
  }

  async deleteTemplatesIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/templates';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveTwilioIntegration(input: SaveTwilioIntegrationRequest): Promise<TwilioConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/twilio';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as TwilioConfig;
    return responseModel;
  }

  async deleteTwilioIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/twilio';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveWebPushIntegration(input: SaveWebPushIntegrationRequest): Promise<WebpushConfig> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/web_push';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.put(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as WebpushConfig;
    return responseModel;
  }

  async deleteWebPushIntegration(): Promise<any> {
    const urlEndpoint = '/integrations/web_push';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }
}
