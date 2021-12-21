/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import CloseIcon from '../UserPreferencesPanel/CloseIcon';

/**
 *
 * @example
 * <EnablePushNotificationsButton onClick={closeBanner} />
 */
export default function CloseBannerButton({ onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="close notification"
      css={css`
        display: flex;
        align-items: center;

        svg {
          height: 24px;
        }
      `}
    >
      <CloseIcon />
    </button>
  );
}
