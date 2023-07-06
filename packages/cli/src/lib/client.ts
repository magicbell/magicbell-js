import { Command } from 'commander';
import { Client, ClientOptions } from 'magicbell';

import pkg from '../../package.json';
import { configStore } from './config';
import { printMessage } from './printer';
import { serialize } from './serializers';

type ExtendedClient = InstanceType<typeof Client> & { getProject: () => Promise<{ id: string; name: string }> };

const features: ClientOptions['features'] = {};

export function getClient(cmd: Command, options?: Partial<ClientOptions>) {
  const { profile, host, printRequest } = cmd.optsWithGlobals();
  const project = configStore.getProject(profile);

  const defaultOptions = {
    apiKey: project?.apiKey,
    apiSecret: project?.apiSecret,
    userEmail: project?.userEmail,
    userExternalId: project?.userExternalId,
    host: host || project?.host,
  };

  for (const key in defaultOptions) {
    if (defaultOptions[key] == null || defaultOptions[key] === '') {
      delete defaultOptions[key];
    }
  }

  const hooks: ClientOptions['hooks'] = {};

  if (printRequest) {
    hooks.beforeRequest = [
      async (request) => {
        printMessage(await serialize(request, printRequest));
        process.exit(0);
      },
    ];
  }

  const client = new Client({
    ...defaultOptions,
    ...options,
    appInfo: { name: pkg.name, version: pkg.version },
    features,
    hooks,
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
