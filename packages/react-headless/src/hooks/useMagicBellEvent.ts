import { useEffect } from 'react';
import { eventAggregator, EventSource } from '../lib/realtime';

interface HookOptions {
  source: EventSource | 'any';
}

/**
 * React hook to listen to events.
 *
 * @param event Name of the event
 * @param handler Callback function
 * @param options
 */
export default function useMagicBellEvent(
  event: string,
  handler: (data?: unknown, source?: EventSource) => void,
  options: HookOptions = { source: 'any' },
) {
  useEffect(() => {
    const callback = (args: Partial<{ data: unknown; source: EventSource }> = {}) => {
      if (options.source === 'remote' && args.source !== 'remote') return;
      if (options.source === 'local' && args.source !== 'local') return;
      handler(args.data, args.source);
    };

    eventAggregator.on(event, callback);

    return () => {
      eventAggregator.off(event, callback);
    };
  }, []);
}
