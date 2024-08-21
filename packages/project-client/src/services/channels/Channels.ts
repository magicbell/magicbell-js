import BaseService from '../../BaseService';
import { serializePath } from '../../http/QuerySerializer';
import { ApnsTokenWithMetadata } from './models/ApnsTokenWithMetadata';
import { ArrayWithMetadataOfApnsToken } from './models/ArrayWithMetadataOfApnsToken';
import { ArrayWithMetadataOfFcmToken } from './models/ArrayWithMetadataOfFcmToken';
import { ArrayWithMetadataOfSlackToken } from './models/ArrayWithMetadataOfSlackToken';
import { ArrayWithMetadataOfTeamsToken } from './models/ArrayWithMetadataOfTeamsToken';
import { ArrayWithMetadataOfWebPushToken } from './models/ArrayWithMetadataOfWebPushToken';
import { DiscardResult } from './models/DiscardResult';
import { FcmTokenWithMetadata } from './models/FcmTokenWithMetadata';
import { SlackTokenWithMetadata } from './models/SlackTokenWithMetadata';
import { TeamsTokenWithMetadata } from './models/TeamsTokenWithMetadata';
import { WebPushTokenWithMetadata } from './models/WebPushTokenWithMetadata';

export class ChannelsService extends BaseService {
  async getMobilePushApnsUserTokens(userId: string): Promise<ArrayWithMetadataOfApnsToken> {
    if (userId === undefined) {
      throw new Error('The following parameter is required: userId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/mobile_push/apns/tokens';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getMobilePushApnsUserToken(userId: string, tokenId: string): Promise<ApnsTokenWithMetadata> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async discardMobilePushApnsUserToken(userId: string, tokenId: string): Promise<DiscardResult> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getMobilePushFcmUserTokens(userId: string): Promise<ArrayWithMetadataOfFcmToken> {
    if (userId === undefined) {
      throw new Error('The following parameter is required: userId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/mobile_push/fcm/tokens';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getMobilePushFcmUserToken(userId: string, tokenId: string): Promise<FcmTokenWithMetadata> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async discardMobilePushFcmUserToken(userId: string, tokenId: string): Promise<DiscardResult> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getSlackUserTokens(userId: string): Promise<ArrayWithMetadataOfSlackToken> {
    if (userId === undefined) {
      throw new Error('The following parameter is required: userId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/slack/tokens';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getSlackUserToken(userId: string, tokenId: string): Promise<SlackTokenWithMetadata> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/slack/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async discardSlackUserToken(userId: string, tokenId: string): Promise<DiscardResult> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/slack/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getTeamsUserTokens(userId: string): Promise<ArrayWithMetadataOfTeamsToken> {
    if (userId === undefined) {
      throw new Error('The following parameter is required: userId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/teams/tokens';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getTeamsUserToken(userId: string, tokenId: string): Promise<TeamsTokenWithMetadata> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/teams/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async discardTeamsUserToken(userId: string, tokenId: string): Promise<DiscardResult> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/teams/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getWebPushUserTokens(userId: string): Promise<ArrayWithMetadataOfWebPushToken> {
    if (userId === undefined) {
      throw new Error('The following parameter is required: userId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/web_push/tokens';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async getWebPushUserToken(userId: string, tokenId: string): Promise<WebPushTokenWithMetadata> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/web_push/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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

  async discardWebPushUserToken(userId: string, tokenId: string): Promise<DiscardResult> {
    if (userId === undefined || tokenId === undefined) {
      throw new Error('The following are required parameters: userId,tokenId, cannot be empty or blank');
    }
    let urlEndpoint = '/users/{user_id}/channels/web_push/tokens/{token_id}';
    urlEndpoint = urlEndpoint.replace('{user_id}', serializePath('simple', false, userId, undefined));
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
