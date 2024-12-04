import { Command } from 'commander';
import { createHmac } from 'magicbell/crypto';
import { ProjectClient, ProjectClientOptions } from 'magicbell/project-client';
import { UserClient, UserClientOptions } from 'magicbell/user-client';

import { configStore } from './config.js';
import { pkg } from './pkg.js';
import { printMessage } from './printer.js';
import { serialize } from './serializers.js';

type Hooks = ProjectClientOptions['hooks'];
const features: ProjectClientOptions['features'] = {};

function getConfig(cmd: Command, options?: Partial<ProjectClientOptions | UserClientOptions>) {
  const { profile, host, printRequest, userEmail, userExternalId, token } = cmd.optsWithGlobals();
  const project = configStore.getProject(profile);

  const defaultOptions = {
    apiKey: project?.apiKey,
    apiSecret: project?.apiSecret,
    token: token || project?.token,
    userEmail: userEmail,
    userExternalId: userExternalId,
    host: host || project?.host,
  };

  // only load userEmail and userExternalId from config when not provided via args
  if (!defaultOptions.userEmail && !defaultOptions.userExternalId) {
    defaultOptions.userEmail = project?.userEmail;
    defaultOptions.userExternalId = project?.userExternalId;
  }

  for (const key in defaultOptions) {
    if (defaultOptions[key] == null || defaultOptions[key] === '') {
      delete defaultOptions[key];
    }
  }

  const hooks: Hooks = options?.hooks || {};

  if (printRequest) {
    hooks.beforeRequest = [
      ...(hooks.beforeRequest || []),
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
  return new ProjectClient(config);
}
