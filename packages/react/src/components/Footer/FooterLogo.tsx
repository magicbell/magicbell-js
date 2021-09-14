import { useConfig } from '@magicbell/react-headless';
import get from 'lodash/get';
import React from 'react';
import MagicBellLogo from './MagicBellLogo';

/**
 * MagicBell Logo for the footer. If the customer has branding off, the logo is
 * hidden.
 *
 * @example
 * <FooterLogo />
 */
export default function FooterLogo() {
  const config = useConfig();
  const hideBranding = get(config?.inbox, 'features.noMagicbellBranding.enabled', false);

  if (hideBranding) return <p style={{ height: '20px' }} />;
  return (
    <a href="https://magicbell.io/?utm_source=widget" target="_blank" rel="noopener noreferrer">
      <MagicBellLogo />
    </a>
  );
}
