import create from 'zustand';

import IRemoteConfig from '../../types/IRemoteConfig';
import ConfigRepository from './ConfigRepository';

interface Config extends IRemoteConfig {
  lastFetchedAt?: number;

  /**
   * Fetch the configuration for the current user from the MagicBell server.
   */
  fetch: () => Promise<void>;

  _repository: ConfigRepository;
}

/**
 * Remote configuration store. It contains all settings stored in MagicBell
 * servers for this user.
 *
 * @example
 * const { fetch } = useConfig();
 * useEffect(() => fetch(), []);
 */
const useConfig = create<Config>((set, get) => ({
  channels: undefined,
  inbox: undefined,
  ws: undefined,
  lastFetchedAt: undefined,

  _repository: new ConfigRepository(),

  fetch: async () => {
    const { _repository } = get();
    const json = await _repository.get();

    set({ ...json, lastFetchedAt: Date.now() });
  },
}));

export default useConfig;
