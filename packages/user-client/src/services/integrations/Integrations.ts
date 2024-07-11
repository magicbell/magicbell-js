import BaseService from '../../BaseService';
import { FinishSlackInstallationRequest } from './models/FinishSlackInstallationRequest';
import { SaveSlackInstallationRequest } from './models/SaveSlackInstallationRequest';
import { SaveTemplatesInstallationRequest } from './models/SaveTemplatesInstallationRequest';
import { SlackInstallation } from './models/SlackInstallation';
import { StartSlackInstallationRequest } from './models/StartSlackInstallationRequest';
import { StartWebPushInstallationRequest } from './models/StartWebPushInstallationRequest';
import { TemplatesInstallation } from './models/TemplatesInstallation';
import { WebPushStartInstallationResponse } from './models/WebPushStartInstallationResponse';

export class IntegrationsService extends BaseService {
  async saveSlackInstallation(input: SaveSlackInstallationRequest): Promise<SlackInstallation> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/slack/installations';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.post(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as SlackInstallation;
    return responseModel;
  }

  async finishSlackInstallation(input: FinishSlackInstallationRequest): Promise<SlackInstallation> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/slack/installations/finish';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.post(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as SlackInstallation;
    return responseModel;
  }

  async startSlackInstallation(input: StartSlackInstallationRequest): Promise<any> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/slack/installations/start';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.post(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data;
    return responseModel;
  }

  async saveTemplatesInstallation(input: SaveTemplatesInstallationRequest): Promise<TemplatesInstallation> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/templates/installations';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.post(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as TemplatesInstallation;
    return responseModel;
  }

  async startWebPushInstallation(input: StartWebPushInstallationRequest): Promise<WebPushStartInstallationResponse> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/integrations/web_push/installations/start';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.post(
      finalUrl,
      input,
      {
        ...headers,
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as WebPushStartInstallationResponse;
    return responseModel;
  }
}
