import React from 'react';
import MagicBellProvider, { MagicBellProviderProps } from '.';
import { useMagicBellContext } from '../..';

interface Props extends MagicBellProviderProps {}

/**
 * Component that conditionally wraps the children with a MagicBellProvider
 * unless one is defined already.
 */
export default function MagicBellChildrenWrapper({ children, ...settings }: Props) {
  const context = useMagicBellContext();
  const hasContext = context !== null;

  if (hasContext) return <>{children}</>;
  return <MagicBellProvider {...settings}>{children}</MagicBellProvider>;
}
