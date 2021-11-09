import { useEffect } from 'react';
import { connectToAbly, handleAblyEvent, pushEventAggregator } from '../lib/realtime';
import useConfig from '../stores/config';
import { WebSocketConfig } from '../types/IRemoteConfig';

function createRealtimeSubscription(config: WebSocketConfig) {
  const { channel: realtimeChannel } = config;
  const ablyClient = connectToAbly(config);

  const emitWakeup = () => pushEventAggregator.emit('wakeup');
  ablyClient.connection.on('disconnected', emitWakeup);
  ablyClient.connection.on('suspended', emitWakeup);

  const ablyChannel = ablyClient.channels.get(realtimeChannel);
  ablyChannel.subscribe(handleAblyEvent);

  return () => {
    ablyChannel.unsubscribe(handleAblyEvent);
    ablyChannel.detach();

    ablyClient.connection.off('disconnected');
    ablyClient.connection.off('suspended');
    ablyClient.close();
  };
}

/**
 * React hook to start listening to ably events on a channel.
 */
export function useAbly() {
  const config = useConfig();

  useEffect(() => {
    if (config.ws) return createRealtimeSubscription(config.ws);
    else return () => {};
  }, [config.ws]);
}
