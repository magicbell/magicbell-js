import { Global } from '@emotion/core';
import { MagicBellContext, NotificationInbox } from '@magicbell/magicbell-react';
import { NotificationInboxProps } from '@magicbell/magicbell-react/dist/types/components/NotificationInbox';
import React, { useContext } from 'react';
import Frame from 'react-frame-component';
import { useFrameSize } from '../../lib/window';
import FrameProvider from '../FrameProvider';

export interface FrameContentProps extends NotificationInboxProps {
  width?: number;
  height?: number;
}

/**
 * Responsive iframe wrapper for a notification inbox.
 *
 * @example
 * <FrameContent />
 */
export default function FrameContent({ width: defaultWidth, height: defaultHeight, ...props }: FrameContentProps) {
  const { theme } = useContext(MagicBellContext);
  const { header: headerTheme, footer: footerTheme } = theme;
  const { width, height } = useFrameSize(defaultWidth, defaultHeight);

  return (
    <Frame
      id="magicbell-frame"
      frameBorder="0"
      scrolling="no"
      height={height}
      width={width}
      style={{ display: 'block' }}
    >
      <FrameProvider>
        <Global
          styles={{
            html: {
              borderRadius: `${headerTheme.borderRadius} ${headerTheme.borderRadius} ${footerTheme.borderRadius} ${footerTheme.borderRadius}`,
              height: 0,
              margin: 0,
            },
            body: {
              borderRadius: `${headerTheme.borderRadius} ${headerTheme.borderRadius} ${footerTheme.borderRadius} ${footerTheme.borderRadius}`,
              height: 0,
              margin: 0,
            },
          }}
        />
        <NotificationInbox height={height} {...props} />
      </FrameProvider>
    </Frame>
  );
}

FrameContent.defaultProps = {
  width: 500,
  height: 600,
};
