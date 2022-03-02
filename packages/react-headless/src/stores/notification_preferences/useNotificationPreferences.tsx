import create from 'zustand';

import IRemoteNotificationPreferences from '../../types/IRemoteNotificationPreferences';
import NotificationPreferencesRepository from './NotificationPreferencesRepository';

export interface INotificationPreferences extends IRemoteNotificationPreferences {
  lastFetchedAt?: number;

  /**
   * Fetch the notification preferences for the current user from the MagicBell server.
   */
  fetch: () => Promise<void>;

  /**
   * Update the notification preferences for the current user.
   *
   * @preferences Object containing the new preferences.
   */
  save: (preferences: IRemoteNotificationPreferences) => Promise<void>;

  _repository: NotificationPreferencesRepository;
}

/**
 * Remote notification preferences store. It contains all preferences stored in MagicBell servers for this user.
 *
 * @example
 * const { fetch } = useNotificationPreferences();
 * useEffect(() => fetch(), []);
 */
const useNotificationPreferences = create<INotificationPreferences>((set, get) => ({
  categories: [],

  _repository: new NotificationPreferencesRepository(),

  fetch: async () => {
    const { _repository } = get();

    try {
      const { notificationPreferences: json } = await _repository.get();
      set({ ...json, lastFetchedAt: Date.now() });
    } catch (error) {
      set({ categories: [], lastFetchedAt: Date.now() });
    }
  },

  save: async (preferences) => {
    const { _repository } = get();

    try {
      const { notificationPreferences: json } = await _repository.update(preferences);
      set({ ...json, lastFetchedAt: Date.now() });
    } catch (error) {
      set({ categories: [], lastFetchedAt: Date.now() });
    }
  },
}));

export default useNotificationPreferences;
