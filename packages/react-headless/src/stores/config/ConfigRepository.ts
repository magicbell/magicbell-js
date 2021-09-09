import humps from 'humps';
import { fetchAPI } from '../../lib/ajax';
import IRemoteConfig from '../../types/IRemoteConfig';

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
  async get(): Promise<IRemoteConfig> {
    const json = await fetchAPI(this.remotePathOrUrl);
    return humps.camelizeKeys(json);
  }
}
