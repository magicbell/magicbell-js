/** @jsx jsx */
import { css, jsx } from '@emotion/react';

interface Props {
  attrs?;
  children;
  width?: number;
  layout: string[];
}

/**
 * Styled container to wrap the notification inbox with.
 *
 * @example
 * <StyledPopoverContainer>
 *   <Notifications />
 * </StyledPopoverContainer>
 */
export default function StyledPopoverContainer({ width = 400, children, attrs }: Props) {
  return (
    <div
      css={css`
        width: ${width}px;
        max-width: calc(100vw - 10px);
      `}
      {...attrs}
    >
      {children}
    </div>
  );
}
