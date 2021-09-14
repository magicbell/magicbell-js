/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useConfig } from '@magicbell/react-headless';
import { get } from 'lodash';
import useToggle from 'react-use/lib/useToggle';
import { useTheme } from '../../context/MagicBellThemeContext';
import UserPreferencesPanel from '../UserPreferencesPanel';
import FooterLogo from './FooterLogo';
import SettingsIcon from './SettingsIcon';
import StyledFooter from './StyledFooter';

/**
 * Footer for the notification inbox. Renders a link to the MagicBell site.
 *
 * @example
 * <Footer />
 */
export default function Footer() {
  const theme = useTheme();
  const config = useConfig();
  const { footer: footerTheme } = theme;

  const [showUserPreferences, toggleUserPreferences] = useToggle(false);

  const contentStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${footerTheme.textColor} !important;

    a,
    button {
      color: ${footerTheme.textColor};
      display: block;
    }

    a {
      opacity: 0.85;
    }
  `;

  if (showUserPreferences) return <UserPreferencesPanel onClose={toggleUserPreferences} />;

  return (
    <StyledFooter>
      <div css={contentStyle}>
        <FooterLogo />
        {get(config?.inbox, 'features.notificationPreferences.enabled') == false ? null : (
          <button onClick={toggleUserPreferences}>
            <SettingsIcon />
          </button>
        )}
      </div>
    </StyledFooter>
  );
}
