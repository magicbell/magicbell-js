import { Command } from 'commander';
import {
  ClientOptions,
  createHmac,
  ProjectClient,
  ProjectClientOptions,
  UserClient,
  UserClientOptions,
} from 'magicbell';

import pkg from '../../package.json';
import { configStore } from './config';
import { printMessage } from './printer';
import { serialize } from './serializers';

const features: ProjectClientOptions['features'] = {};

class ExtendedProjectClient extends ProjectClient {
  async getProject() {
    const project = await super
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
  }
}

function getConfig(cmd: Command, options?: Partial<ProjectClientOptions | UserClientOptions>) {
  const { profile, host, printRequest, userEmail, userExternalId } = cmd.optsWithGlobals();
  const project = configStore.getProject(profile);

  const defaultOptions = {
    apiKey: project?.apiKey,
    apiSecret: project?.apiSecret,
    userEmail: userEmail || project?.userEmail,
    userExternalId: userExternalId || project?.userExternalId,
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

  return {
    ...defaultOptions,
    ...options,
    appInfo: { name: pkg.name, version: pkg.version },
    features,
    hooks,
  };
}

export function getUserClient(cmd: Command, options?: Partial<UserClientOptions>) {
  const { apiSecret, ...config } = getConfig(cmd, options);
  const userHmac = apiSecret ? createHmac(apiSecret, config) : '';
  return new UserClient({ ...config, userHmac });
}

export function getProjectClient(cmd: Command, options?: Partial<ProjectClientOptions>) {
  const config = getConfig(cmd, options);
  return new ExtendedProjectClient(config);
}
