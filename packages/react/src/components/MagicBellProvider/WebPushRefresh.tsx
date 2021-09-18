import IRemoteConfig from '@magicbell/react-headless/dist/types/IRemoteConfig';
import pathOr from 'ramda/src/pathOr';
import React from 'react';

interface Props {
  config: IRemoteConfig;
}

/**
 * Component that renders the web push subscription page in an invisible iframe
 * to refresh the user's subscription.
 *
 * @example
 * <WebPushRefresh config={configStore} />
 */
export default function WebPushRefresh({ config }: Props) {
  const isWebPushEnabled = pathOr(false, ['webPush', 'enabled'], config.channels);
  const subscribeUrl = pathOr(false, ['webPush', 'config', 'subscribeUrl'], config.channels);

  if (!isWebPushEnabled) return null;
  return (
    <iframe
      title="Web push subscriptions"
      src={subscribeUrl}
      height="0"
      width="0"
      tabIndex={-1}
      style={{ display: 'none' }}
      hidden
    />
  );
}
