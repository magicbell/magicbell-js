import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import humps from 'humps';
import { Server } from 'miragejs';
import { useEffect } from 'react';
import useNotificationPreferences from '../../../../src/stores/notification_preferences';
import { sampleNotificationPreferences } from '../../../factories/NotificationPreferencesFactory';

describe('hooks', () => {
  describe('useNotificationPreferences', () => {
    describe('.fetch', () => {
      let server;

      beforeEach(() => {
        const response = {
          notification_preferences: humps.decamelizeKeys(sampleNotificationPreferences),
        };

        server = new Server({ timing: 50, environment: 'test', urlPrefix: 'https://api.magicbell.com' });
        server.get('/notification_preferences', response);
      });

      afterEach(() => {
        server.shutdown();
      });

      it('fetches from the MagicBell API config endpoint', async () => {
        const useFetchPreferences = () => {
          const preferences = useNotificationPreferences();
          useEffect(() => void preferences.fetch(), []);

          return preferences;
        };

        const { result } = renderHook(() => useFetchPreferences());

        await waitFor(() => expect(result.current).toMatchObject(sampleNotificationPreferences));
      });
    });

    describe('.save', () => {
      let server;

      beforeEach(() => {
        server = new Server({ timing: 50, environment: 'test', urlPrefix: 'https://api.magicbell.com' });
        server.put('/notification_preferences', (_, res) => JSON.stringify(res.requestBody));
      });

      afterEach(() => {
        server.shutdown();
      });

      it('updates the user preferences', async () => {
        const data = { categories: { test: { inApp: false } } };
        const useFetchPreferences = () => {
          const preferences = useNotificationPreferences();
          useEffect(() => void preferences.save(data), []);

          return preferences;
        };

        const { result } = renderHook(() => useFetchPreferences());

        await waitFor(() => expect(result.current).toMatchObject(data));
      });
    });
  });
});
