import faker from '@faker-js/faker';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as humps from 'humps';
import { Server } from 'miragejs';
import { useEffect } from 'react';
import { beforeAll } from 'vitest';

import clientSettings from '../../../../src/stores/clientSettings';
import useConfig from '../../../../src/stores/config';
import { sampleConfig } from '../../../factories/ConfigFactory';

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

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
          useEffect(() => void config.fetch(), [config]);

          return config;
        };

        const { result } = renderHook(() => useFetchConfig());

        await waitFor(() => expect(result.current).toMatchObject(sampleConfig));
      });
    });
  });
});
