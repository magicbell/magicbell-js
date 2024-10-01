import { create } from 'zustand';

import IRemoteNotificationPreferences, {
  CategoryChannelPreference,
} from '../../types/IRemoteNotificationPreferences.js';
import NotificationPreferencesRepository from './NotificationPreferencesRepository.js';

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

function sortCategories(categories: CategoryChannelPreference[] = []): CategoryChannelPreference[] {
  // sort categories and category channels,
  // so the preferences pane is stable after update
  categories.sort((a, b) => a.slug.localeCompare(b.slug));
  for (const cat of categories) {
    cat.channels.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  return categories;
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
      const categories = sortCategories(json.categories);
      set({ categories, lastFetchedAt: Date.now() });
    } catch (error) {
      set({ categories: [], lastFetchedAt: Date.now() });
    }
  },

  save: async (preferences) => {
    const { _repository } = get();

    try {
      const { notificationPreferences: json } = await _repository.update(preferences);
      const categories = sortCategories(json.categories);
      set({ categories, lastFetchedAt: Date.now() });
    } catch (error) {
      set({ categories: [], lastFetchedAt: Date.now() });
    }
  },
}));

export default useNotificationPreferences;
