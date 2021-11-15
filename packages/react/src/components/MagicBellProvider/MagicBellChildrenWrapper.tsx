import React, { useContext } from 'react';
import CurrentProviderContext, { NO_PROVIDER } from '../../context/CurrentProviderContext';
import MagicBellProvider, { Props as MagicBellProviderProps } from './MagicBellProvider';

interface Props extends MagicBellProviderProps {}

/**
 * Component that conditionally wraps the children with a MagicBellProvider
 * unless one is defined already.
 */
export default function MagicBellChildrenWrapper({ children, ...settings }: Props) {
  const currentContext = useContext(CurrentProviderContext);

  if (currentContext === NO_PROVIDER)
    return <MagicBellProvider {...settings}>{children}</MagicBellProvider>;
  return <>{children}</>;
}
