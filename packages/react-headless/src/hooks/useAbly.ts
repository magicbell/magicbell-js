import { useEffect } from 'react';

import { connectToAbly, emitEvent, handleAblyEvent } from '../lib/realtime';
import useConfig from '../stores/config';
import { WebSocketConfig } from '../types/IRemoteConfig';

function createRealtimeSubscription(config: WebSocketConfig) {
  let recoveringConnection = false;
  const { channel: realtimeChannel } = config;
  const ablyClient = connectToAbly(config);

  ablyClient.connection.on('suspended', (stateChange) => {
    // Fire the "disconnected" event only once.
    // Note that we use the "disconnected" term to indicate that the connection is suspended (in Ably terms).
    if (stateChange.previous === 'disconnected') emitEvent('disconnected', stateChange, 'local');
  });

  ablyClient.connection.on((stateChange) => {
    const { current, previous } = stateChange;

    // When the computer wakes up from sleep, the suspended event is not fired. Ably rather resumes from
    // the disconnected state.
    if (['suspended', 'disconnected'].includes(previous) && current === 'connecting') {
      recoveringConnection = true;
    }
    if (recoveringConnection && current === 'connected') {
      recoveringConnection = false;
      emitEvent('reconnected', stateChange, 'local');
    }
  });

  const ablyChannel = ablyClient.channels.get(realtimeChannel);
  ablyChannel.subscribe(handleAblyEvent);

  return () => {
    ablyChannel.unsubscribe(handleAblyEvent);
    ablyChannel.detach();

    ablyClient.connection.off(); // Remove all event listeners
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
    else return () => undefined;
  }, [config.ws]);
}
