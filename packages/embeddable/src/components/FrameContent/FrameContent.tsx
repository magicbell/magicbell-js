import { Global } from '@emotion/core';
import { MagicBellContext, NotificationInbox } from '@magicbell/magicbell-react';
import { FloatingNotificationInboxProps } from '@magicbell/magicbell-react/dist/types/components/FloatingNotificationInbox';
import { h } from 'preact';
import { useContext } from 'preact/hooks';
import Frame from 'react-frame-component';
import { useFrameSize } from '../../lib/window';
import FrameProvider from '../FrameProvider';

/**
 * Responsive iframe wrapper for a notification inbox.
 *
 * @example
 * <FrameContent />
 */
export default function FrameContent({
  width: defaultWidth,
  height: defaultHeight,
  ...props
}: FloatingNotificationInboxProps) {
  const { theme } = useContext(MagicBellContext);
  const { header: headerTheme, footer: footerTheme } = theme;
  const { width, height } = useFrameSize(defaultWidth, defaultHeight);

  return (
    <Frame id="magicbell-frame" frameBorder="0" scrolling="no" height={height} width={width}>
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
        <NotificationInbox {...props} />
      </FrameProvider>
    </Frame>
  );
}
