import BaseService from '../../BaseService';
import { serializePath } from '../../http/QuerySerializer';
import { ApnsToken } from './models/ApnsToken';
import { ApnsTokenWithMetadata } from './models/ApnsTokenWithMetadata';
import { ArrayWithMetadataOfApnsToken } from './models/ArrayWithMetadataOfApnsToken';
import { ArrayWithMetadataOfFcmToken } from './models/ArrayWithMetadataOfFcmToken';
import { ArrayWithMetadataOfSlackToken } from './models/ArrayWithMetadataOfSlackToken';
import { ArrayWithMetadataOfTeamsToken } from './models/ArrayWithMetadataOfTeamsToken';
import { ArrayWithMetadataOfWebPushToken } from './models/ArrayWithMetadataOfWebPushToken';
import { DiscardResult } from './models/DiscardResult';
import { FcmToken } from './models/FcmToken';
import { FcmTokenWithMetadata } from './models/FcmTokenWithMetadata';
import { SaveMobilePushApnsTokenRequest } from './models/SaveMobilePushApnsTokenRequest';
import { SaveMobilePushFcmTokenRequest } from './models/SaveMobilePushFcmTokenRequest';
import { SaveSlackTokenRequest } from './models/SaveSlackTokenRequest';
import { SaveTeamsTokenRequest } from './models/SaveTeamsTokenRequest';
import { SaveWebPushTokenRequest } from './models/SaveWebPushTokenRequest';
import { SlackToken } from './models/SlackToken';
import { SlackTokenWithMetadata } from './models/SlackTokenWithMetadata';
import { TeamsTokenWithMetadata } from './models/TeamsTokenWithMetadata';
import { WebPushToken } from './models/WebPushToken';
import { WebPushTokenWithMetadata } from './models/WebPushTokenWithMetadata';

export class ChannelsService extends BaseService {
  async getMobilePushApnsTokens(): Promise<ArrayWithMetadataOfApnsToken> {
    const urlEndpoint = '/channels/mobile_push/apns/tokens';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ArrayWithMetadataOfApnsToken;
    return responseModel;
  }

  async saveMobilePushApnsToken(input: SaveMobilePushApnsTokenRequest): Promise<ApnsToken> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/channels/mobile_push/apns/tokens';
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
    const responseModel = response.data as ApnsToken;
    return responseModel;
  }

  async getMobilePushApnsToken(tokenId: string): Promise<ApnsTokenWithMetadata> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/mobile_push/apns/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ApnsTokenWithMetadata;
    return responseModel;
  }

  async discardMobilePushApnsToken(tokenId: string): Promise<DiscardResult> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/mobile_push/apns/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as DiscardResult;
    return responseModel;
  }

  async getMobilePushFcmTokens(): Promise<ArrayWithMetadataOfFcmToken> {
    const urlEndpoint = '/channels/mobile_push/fcm/tokens';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ArrayWithMetadataOfFcmToken;
    return responseModel;
  }

  async saveMobilePushFcmToken(input: SaveMobilePushFcmTokenRequest): Promise<FcmToken> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/channels/mobile_push/fcm/tokens';
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
    const responseModel = response.data as FcmToken;
    return responseModel;
  }

  async getMobilePushFcmToken(tokenId: string): Promise<FcmTokenWithMetadata> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/mobile_push/fcm/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as FcmTokenWithMetadata;
    return responseModel;
  }

  async discardMobilePushFcmToken(tokenId: string): Promise<DiscardResult> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/mobile_push/fcm/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as DiscardResult;
    return responseModel;
  }

  async getSlackTokens(): Promise<ArrayWithMetadataOfSlackToken> {
    const urlEndpoint = '/channels/slack/tokens';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ArrayWithMetadataOfSlackToken;
    return responseModel;
  }

  async saveSlackToken(input: SaveSlackTokenRequest): Promise<SlackToken> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/channels/slack/tokens';
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
    const responseModel = response.data as SlackToken;
    return responseModel;
  }

  async getSlackToken(tokenId: string): Promise<SlackTokenWithMetadata> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/slack/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as SlackTokenWithMetadata;
    return responseModel;
  }

  async discardSlackToken(tokenId: string): Promise<DiscardResult> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/slack/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as DiscardResult;
    return responseModel;
  }

  async getTeamsTokens(): Promise<ArrayWithMetadataOfTeamsToken> {
    const urlEndpoint = '/channels/teams/tokens';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ArrayWithMetadataOfTeamsToken;
    return responseModel;
  }

  async saveTeamsToken(input: SaveTeamsTokenRequest): Promise<any> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/channels/teams/tokens';
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

  async getTeamsToken(tokenId: string): Promise<TeamsTokenWithMetadata> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/teams/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as TeamsTokenWithMetadata;
    return responseModel;
  }

  async discardTeamsToken(tokenId: string): Promise<DiscardResult> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/teams/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as DiscardResult;
    return responseModel;
  }

  async getWebPushTokens(): Promise<ArrayWithMetadataOfWebPushToken> {
    const urlEndpoint = '/channels/web_push/tokens';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as ArrayWithMetadataOfWebPushToken;
    return responseModel;
  }

  async saveWebPushToken(input: SaveWebPushTokenRequest): Promise<WebPushToken> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/channels/web_push/tokens';
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
    const responseModel = response.data as WebPushToken;
    return responseModel;
  }

  async getWebPushToken(tokenId: string): Promise<WebPushTokenWithMetadata> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/web_push/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as WebPushTokenWithMetadata;
    return responseModel;
  }

  async discardWebPushToken(tokenId: string): Promise<DiscardResult> {
    if (tokenId === undefined) {
      throw new Error('The following parameter is required: tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/channels/web_push/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{token_id}', serializePath('simple', false, tokenId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.delete(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as DiscardResult;
    return responseModel;
  }
}
