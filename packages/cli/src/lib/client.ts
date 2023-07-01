import { Client, ClientOptions } from 'magicbell';

import pkg from '../../package.json';
import { configStore } from './config';

type ExtendedClient = InstanceType<typeof Client> & { getProject: () => Promise<{ id: string; name: string }> };

const features: ClientOptions['features'] = {};

export function getClient(options?: Partial<ClientOptions>) {
  const project = configStore.getProject();

  const defaultOptions = {
    apiKey: project?.apiKey,
    apiSecret: project?.apiSecret,
    userEmail: project?.userEmail,
    userExternalId: project?.userExternalId,
    host: configStore.host || project?.host,
  };

  for (const key in defaultOptions) {
    if (defaultOptions[key] == null || defaultOptions[key] === '') {
      delete defaultOptions[key];
    }
  }

  const client = new Client({
    ...defaultOptions,
    ...options,
    appInfo: { name: pkg.name, version: pkg.version },
    features,
  }) as ExtendedClient;

  client.getProject = async function getProject() {
    const project = await client
      .request({
        method: 'POST',
        path: '/graphql',
        data: {
          query: `{ currentProject { id, name } }`,
        },
      })
      .then((x) => x.data.currentProject);

    if (!project) {
      throw Error('Could not find project');
    }

    return project;
  };

  return client;
}
