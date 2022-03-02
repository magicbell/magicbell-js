import { useConfig } from '@magicbell/react-headless';
import { pathOr } from 'ramda';
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
  const inboxConfig = useConfig((state) => state.inbox);
  const hideBranding = pathOr(false, ['features', 'noMagicbellBranding', 'enabled'], inboxConfig);

  if (hideBranding) return <p style={{ height: '20px' }} />;
  return (
    <a href="https://magicbell.io/?utm_source=widget" target="_blank" rel="noopener noreferrer">
      <MagicBellLogo />
    </a>
  );
}
