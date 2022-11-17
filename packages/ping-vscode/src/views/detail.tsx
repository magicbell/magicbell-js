import * as React from 'react';

import { signalKeys } from '../constants';
import { useRemoteSignal } from '../lib/hooks';

export function Detail(props) {
  const [notification] = useRemoteSignal(signalKeys.ACTIVE_NOTIFICATION);

  return (
    <div>
      <pre>{JSON.stringify({ props, notification, d: Date.now() }, null, 2)}</pre>
    </div>
  );
}
