import * as React from 'react';

import { signalKeys } from '../constants';
import { useRemoteSignal } from '../lib/hooks';

export function ListDetail(props) {
  const [notification] = useRemoteSignal(signalKeys.ACTIVE_NOTIFICATION);

  return (
    <div>
      <pre>{JSON.stringify({ notification, props }, null, 2)}</pre>
    </div>
  );
}
