import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import humps from 'humps';
import { Server } from 'miragejs';
import { useEffect } from 'react';
import useConfig from '../../../../src/stores/config';
import { sampleConfig } from '../../../factories/ConfigFactory';

describe('hooks', () => {
  describe('useConfig', () => {
    describe('.fetch', () => {
      let server;

      beforeEach(() => {
        const configResponse = humps.decamelizeKeys(sampleConfig);

        server = new Server({ timing: 50, environment: 'test', urlPrefix: 'https://api.magicbell.com' });
        server.get('/config', configResponse);
      });

      afterEach(() => {
        server.shutdown();
      });

      it('fetches from the MagicBell API config endpoint', async () => {
        const useFetchConfig = () => {
          const config = useConfig();
          useEffect(() => void config.fetch(), []);

          return config;
        };

        const { result } = renderHook(() => useFetchConfig());

        await waitFor(() => expect(result.current).toMatchObject(sampleConfig));
      });
    });
  });
});
