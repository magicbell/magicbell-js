import faker from '@faker-js/faker';
import { fake, setupMockServer } from '@magicbell/utils';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as humps from 'humps';
import { useEffect } from 'react';
import { beforeEach } from 'vitest';

import clientSettings from '../../../../src/stores/clientSettings';
import useConfig from '../../../../src/stores/config';

const server = setupMockServer();

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
