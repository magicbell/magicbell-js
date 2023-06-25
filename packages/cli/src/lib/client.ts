import { Client, ClientOptions } from 'magicbell';

import { configStore } from './config';

type ExtendedClient = InstanceType<typeof Client> & { getProject: () => Promise<{ id: string; name: string }> };

const features: ClientOptions['features'] = {};

export function getClient(options?: Partial<ClientOptions>) {
  const apiKey = configStore.get('apiKey') || '';
  const apiSecret = configStore.get('apiSecret') || '';
  const userEmail = configStore.get('userEmail') || '';
  const userExternalId = configStore.get('userExternalId') || '';

  const client = new Client({
    apiKey,
    apiSecret,
    userEmail,
    userExternalId,
    ...options,
    appInfo: { name: __PACKAGE_NAME__, version: __PACKAGE_VERSION__ },
    features,
  }) as ExtendedClient;

  client.getProject = async function getProject() {
    return client
      .request({
        method: 'POST',
        path: '/graphql',
        data: {
          query: `{ currentProject { id, name } }`,
        },
      })
      .then((x) => x.data.currentProject);
  };

  return client;
}

process.on('uncaughtException', function (err) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  // eslint-disable-next-line no-console
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
