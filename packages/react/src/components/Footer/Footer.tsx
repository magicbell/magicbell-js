/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useConfig } from '@magicbell/react-headless';
import pathOr from 'ramda/src/pathOr';
import useToggle from 'react-use/lib/useToggle';
import { useTheme } from '../../context/MagicBellThemeContext';
import UserPreferencesPanel from '../UserPreferencesPanel';
import FooterLogo from './FooterLogo';
import SettingsIcon from './SettingsIcon';
import StyledFooter from './StyledFooter';

/**
 * Footer for the notification inbox. Renders a button to toggle the user
 * preferences panel.
 *
 * @example
 * <Footer />
 */
export default function Footer() {
  const [showPreferences, togglePreferences] = useToggle(false);
  const config = useConfig();
  const { inbox } = config;
  const preferencesEnabled = pathOr(
    true,
    ['features', 'notificationPreferences', 'enabled'],
    inbox,
  );

  const theme = useTheme();
  const { footer: footerTheme } = theme;

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

  if (showPreferences) return <UserPreferencesPanel onClose={togglePreferences} />;

  return (
    <StyledFooter>
      <div css={contentStyle}>
        <FooterLogo />
        {preferencesEnabled ? (
          <button onClick={togglePreferences} aria-label="notification preferences">
            <SettingsIcon />
          </button>
        ) : null}
      </div>
    </StyledFooter>
  );
}
