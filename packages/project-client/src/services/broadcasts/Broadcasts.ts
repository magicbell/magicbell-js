import BaseService from '../../BaseService';
import { serializePath } from '../../http/QuerySerializer';
import { Broadcast } from './models/Broadcast';
import { BroadcastListResponse } from './models/BroadcastListResponse';
import { CreateBroadcastRequest } from './models/CreateBroadcastRequest';

export class BroadcastsService extends BaseService {
  /**
   * @description Returns a list of broadcasts
   */
  async listBroadcasts(): Promise<BroadcastListResponse> {
    const urlEndpoint = '/broadcasts';
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as BroadcastListResponse;
    return responseModel;
  }

  /**
   * @description Handles the create notification request.
   */
  async createBroadcast(input: CreateBroadcastRequest): Promise<Broadcast> {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    const urlEndpoint = '/broadcasts';
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
    const responseModel = response.data as Broadcast;
    return responseModel;
  }

  /**
   * @description Returns a broadcast
   */
  async fetchBroadcast(broadcastId: string): Promise<Broadcast> {
    if (broadcastId === undefined) {
      throw new Error('The following parameter is required: broadcastId, cannot be empty or blank');
    }
    let urlEndpoint = '/broadcasts/{broadcast_id}';
    urlEndpoint = urlEndpoint.replace('{broadcast_id}', serializePath('simple', false, broadcastId, undefined));
    const finalUrl = encodeURI(`${this.baseUrl + urlEndpoint}`);
    const response: any = await this.httpClient.get(
      finalUrl,
      {},
      {
        ...this.getAuthorizationHeader(),
      },
      true,
    );
    const responseModel = response.data as Broadcast;
    return responseModel;
  }
}
