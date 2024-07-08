import React, { useContext } from 'react';

import CurrentProviderContext, { NO_PROVIDER } from '../../context/CurrentProviderContext';
import MagicBellProvider, { MagicBellProviderProps } from './MagicBellProvider';

/**
 * Component that conditionally wraps the children with a MagicBellProvider
 * unless one is defined already.
 */
export default function MagicBellChildrenWrapper({ children, apiKey, ...settings }: Partial<MagicBellProviderProps>) {
  const currentContext = useContext(CurrentProviderContext);

  if (currentContext === NO_PROVIDER) {
    if (!apiKey) return null;
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <MagicBellProvider apiKey={apiKey} {...settings}>
        {children}
      </MagicBellProvider>
    );
  }

  return <>{children}</>;
}
