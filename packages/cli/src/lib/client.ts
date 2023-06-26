import { Client, ClientOptions } from 'magicbell';

import { configStore } from './config';

type ExtendedClient = InstanceType<typeof Client> & { getProject: () => Promise<{ id: string; name: string }> };

const features: ClientOptions['features'] = {};

export function getClient(options?: Partial<ClientOptions>) {
  const project = configStore.getProject();

  const apiKey = project?.apiKey || '';
  const apiSecret = project?.apiSecret || '';
  const userEmail = project?.userEmail || '';
  const userExternalId = project?.userExternalId || '';

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
