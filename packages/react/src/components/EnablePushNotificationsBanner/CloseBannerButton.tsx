/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import CloseIcon from '../UserPreferencesPanel/CloseIcon.js';

type CloseBannerButtonProps = {
  onClick: () => void;
};

/**
 *
 * @example
 * <EnablePushNotificationsButton onClick={closeBanner} />
 */
export default function CloseBannerButton({ onClick }: CloseBannerButtonProps) {
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
