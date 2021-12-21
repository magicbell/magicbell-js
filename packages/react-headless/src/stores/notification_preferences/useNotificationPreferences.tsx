import mergeDeepRight from 'ramda/src/mergeDeepRight';
import create from 'zustand';

import { DeepPartial } from '../../types/DeepPartial';
import IRemoteNotificationPreferences, { CategoryPreference } from '../../types/IRemoteNotificationPreferences';
import NotificationPreferencesRepository from './NotificationPreferencesRepository';

interface NotificationPreferences extends IRemoteNotificationPreferences {
  lastFetchedAt?: number;

  /**
   * Fetch the notification preferences for the current user from the MagicBell
   * server.
   */
  fetch: () => Promise<void>;

  /**
   * Update the notification preferences for the current user.
   *
   * @preferences Object containing the new preferences.
   */
  save: (preferences: { categories: DeepPartial<CategoryPreference> }) => Promise<void>;

  _repository: NotificationPreferencesRepository;
}

/**
 * Remote notification preferences store. It contains all preferences stored in
 * MagicBell servers for this user.
 *
 * @example
 * const { fetch } = useNotificationPreferences();
 * useEffect(() => fetch(), []);
 */
const useNotificationPreferences = create<NotificationPreferences>((set, get) => ({
  categories: {},

  _repository: new NotificationPreferencesRepository(),

  fetch: async () => {
    const { _repository } = get();
    const { notificationPreferences: json } = await _repository.get();

    set({ ...json, lastFetchedAt: Date.now() });
  },

  save: async (data) => {
    const { _repository, categories } = get();
    _repository.update({ notificationPreferences: data });

    set({ categories: mergeDeepRight(categories, data.categories), lastFetchedAt: Date.now() });
  },
}));

export default useNotificationPreferences;
