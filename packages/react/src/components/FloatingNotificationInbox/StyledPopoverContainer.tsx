/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import useContainerBorderRadius from '../NotificationInbox/useContainerBorderRadius';

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
export default function StyledPopoverContainer({ width = 400, children, attrs, layout }: Props) {
  const [ltBorderRadius, rtBorderRadius, rbBorderRadius, lbBorderRadius] = useContainerBorderRadius(layout);

  return (
    <div
      css={css`
        border-radius: ${ltBorderRadius} ${rtBorderRadius} ${rbBorderRadius} ${lbBorderRadius};
        box-shadow: 0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04);
        width: ${width}px;
        max-width: calc(100vw - 10px);
        overflow: hidden;
      `}
      {...attrs}
    >
      {children}
    </div>
  );
}
