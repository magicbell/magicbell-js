import React, { useContext } from 'react';

import CurrentProviderContext, { NO_PROVIDER } from '../../context/CurrentProviderContext.js';
import MagicBellProvider, { MagicBellProviderProps } from './MagicBellProvider.js';

/**
 * Component that conditionally wraps the children with a MagicBellProvider
 * unless one is defined already.
 */
export default function MagicBellChildrenWrapper({ children, apiKey, ...settings }: MagicBellProviderProps) {
  const currentContext = useContext(CurrentProviderContext);

  if (currentContext === NO_PROVIDER) {
    if (!apiKey) return null;
    return (
      <MagicBellProvider apiKey={apiKey} {...settings}>
        {children}
      </MagicBellProvider>
    );
  }

  return <>{children}</>;
}
