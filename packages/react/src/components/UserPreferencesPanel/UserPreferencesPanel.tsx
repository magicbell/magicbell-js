/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useNotificationPreferences } from '@magicbell/react-headless';
import { useEffect } from 'react';
import { useTheme } from '../../context/MagicBellThemeContext';
import FooterLogo from '../Footer/FooterLogo';
import StyledFooter from '../Footer/StyledFooter';
import StyledHeader from '../Header/StyledHeader';
import CloseIcon from './CloseIcon';
import PreferencesCategories from './PreferencesCategories';

export interface Props {
  onClose: () => void;
}

/**
 * Panel with header and footer, to render user preferences.
 *
 * @example
 * <UserPreferencesPanel onClose={closePanel} />
 */
export default function UserPreferencesPanel({ onClose }: Props) {
  const preferences = useNotificationPreferences();
  const theme = useTheme();
  const { footer: footerTheme, header: headerTheme, container: containerTheme } = theme;

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!preferences.lastFetchedAt) preferences.fetch();
  }, []);

  return (
    <div
      css={css`
        position: absolute;
        bottom: 0;
        top: 0;
        background: ${containerTheme.backgroundColor};
        color: ${containerTheme.textColor};
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        border-radius: ${headerTheme.borderRadius} ${footerTheme.borderRadius} !important;

        .uppercase {
          text-transform: uppercase;
        }

        button.close svg {
          height: 18px;
        }

        .content {
          flex: 1;
          margin: 4px;
          padding: 16px 20px !important;
          overflow-y: scroll;
        }
      `}
    >
      <StyledHeader>
        <p className="uppercase">Preferences</p>
        <button onClick={handleClose} className="close">
          <CloseIcon />
        </button>
      </StyledHeader>
      <div className="content">
        <PreferencesCategories />
      </div>
      <StyledFooter>
        <div
          css={css`
            padding: 2px 0 !important;
          `}
        >
          <FooterLogo />
        </div>
      </StyledFooter>
    </div>
  );
}
