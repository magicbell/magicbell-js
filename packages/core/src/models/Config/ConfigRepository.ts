import { fetchAPI } from '../../lib/ajax';
import IRemoteConfig from './IRemoteConfig';

/**
 * Class to interact with the config API endpoint.
 *
 * @example
 * const repo = new ConfigRepository();
 * const config = await repo.get();
 */
export default class ConfigRepository {
  remotePathOrUrl: string;

  constructor(remotePathOrUrl = '/config') {
    this.remotePathOrUrl = remotePathOrUrl;
  }

  /**
   * Get the configuration from the API server.
   */
  get(): Promise<IRemoteConfig> {
    return fetchAPI(this.remotePathOrUrl);
  }
}
