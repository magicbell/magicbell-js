import { useEffect } from 'react';
import { pushEventAggregator } from '../lib/realtime';

/**
 * React hook to listen to realtime events.
 *
 * @param event Name of the event
 * @param handler
 */
export default function useMagicBellEvent(event: string, handler: (data?: any) => void) {
  useEffect(() => {
    pushEventAggregator.on(event, handler);

    return () => {
      pushEventAggregator.off(event, handler);
    };
  }, []);
}
