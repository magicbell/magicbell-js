/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export default function Loader() {
  return (
    <div
      css={css`
        color: inherit !important;
        font-size: 0.85em !important;
        padding: 0.5em !important;
        text-align: center !important;
      `}
    >
      Loading...
    </div>
  );
}
