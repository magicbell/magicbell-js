/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useConfig } from '@magicbell/react-headless';
import { pathOr } from 'ramda';

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

  const style = css`
    height: 20px;
    display: inline-flex;
    align-items: center;
  `;

  if (hideBranding) return <div css={style} />;

  return (
    <div css={style}>
      <a href="https://magicbell.io/?utm_source=widget" target="_blank" rel="noopener noreferrer">
        <MagicBellLogo />
      </a>
    </div>
  );
}
