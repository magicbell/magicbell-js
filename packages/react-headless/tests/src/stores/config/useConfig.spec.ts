import faker from '@faker-js/faker';
import { fake, mockHandlers, setupMockServer } from '@magicbell/utils';
import { renderHook, waitFor } from '@testing-library/react';
import * as humps from 'humps';
import { useEffect } from 'react';

import clientSettings from '../../../../src/stores/clientSettings.js';
import useConfig from '../../../../src/stores/config/useConfig.js';

const server = setupMockServer(...mockHandlers);

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

test('fetches from the MagicBell API config endpoint', async () => {
  server.intercept('get', '/config', fake.config);

  const useFetchConfig = () => {
    const config = useConfig();
    useEffect(() => void config.fetch(), []);

    return config;
  };

  const { result } = renderHook(() => useFetchConfig());

  await waitFor(() => expect(result.current).toMatchObject(humps.camelizeKeys(fake.config)));
});
