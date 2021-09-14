/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Text from '../Text';

/**
 * Title for the header component.
 *
 * @example
 * <HeaderTitle />
 */
export default function HeaderTitle() {
  return (
    <p
      css={css`
        margin-right: 16px !important;
      `}
    >
      <Text id="header.title" defaultMessage="NOTIFICATIONS" />
    </p>
  );
}
