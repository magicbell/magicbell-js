import camelize from '../../lib/decorators/camelize.js';
import unwrap from '../../lib/decorators/unwrap.js';
import { CategoryChannelPreferences, CategoryPreference } from './IRemoteNotificationPreferences.js';
import NotificationPreferencesRepository from './NotificationPreferencesRepository.js';

/**
 * A representation of notification preferences.
 *
 * @example
 * const preferences = new NotificationPreferences()
 * await preferences.fetch()
 */
export default class NotificationPreferences {
  categories: CategoryPreference;

  repo: NotificationPreferencesRepository;

  constructor(attrs) {
    this.set(attrs);
    this.repo = new NotificationPreferencesRepository();
  }

  async fetch() {
    const json = await this.repo.get();
    this.set(json);
  }

  async save(data: { categories: Record<string, Partial<CategoryChannelPreferences>> }) {
    const payload = { notification_preferences: data };
    const json = await this.repo.update(payload);
    this.set(json);
  }

  @unwrap('notification_preferences')
  @camelize()
  set(json = {}) {
    Object.assign(this, json);
  }
}
