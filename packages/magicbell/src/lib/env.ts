import { ClientOptions } from '../types';

export function getEnvInfo() {
  const common = {
    binding: __PACKAGE_NAME__,
    binding_version: __PACKAGE_VERSION__,
    publisher: 'magicbell',
  };

  if (typeof process === 'undefined') {
    return common;
  }

  return {
    ...common,
    runtime: process?.release?.name || 'node',
    runtime_version: process.version,
    platform: process.platform,
    arch: process.arch,
  };
}

function getAppInfoAsString(appInfo?: ClientOptions['appInfo']) {
  if (!appInfo?.name) return '';

  return [appInfo?.name, appInfo.version && `/${appInfo.version}`, appInfo.url && ` (${appInfo.url})`]
    .filter(Boolean)
    .join('');
}

export function getUserAgent(appInfo?: ClientOptions['appInfo']) {
  const env = getEnvInfo();

  return [
    `${env.binding}/${env.binding_version}`,
    'runtime' in env && `${env.runtime}/${env.runtime_version}`,
    getAppInfoAsString(appInfo),
  ]
    .filter(Boolean)
    .join(' ');
}

export function getClientUserAgent(appInfo?: ClientOptions['appInfo']) {
  return JSON.stringify({ ...getEnvInfo(), application: appInfo });
}
