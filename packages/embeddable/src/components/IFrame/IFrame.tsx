import { Global } from '@emotion/react';
import { useTheme } from '@magicbell/magicbell-react';
import type { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React from 'react';
import Frame from 'react-frame-component';
import { useFrameSize } from '../../lib/window';
import FrameContent from '../FrameContent';
import FrameProvider from '../FrameProvider';
import IFrameHead from './IFrameHead';

export interface IFrameProps extends NotificationInboxProps {
  width?: number;
  height?: number;
  stylesheets?: string[];
}

/**
 * Responsive iframe.
 *
 * @example
 * <IFrame />
 */
export default function IFrame({
  width: defaultWidth = 500,
  height: defaultHeight = 600,
  stylesheets,
  ...props
}: IFrameProps) {
  const theme = useTheme();
  const { header: headerTheme, footer: footerTheme, container: containerTheme } = theme;
  const { width, height } = useFrameSize(defaultWidth, defaultHeight);

  return (
    <Frame
      id="magicbell-frame"
      frameBorder="0"
      scrolling="no"
      height={height}
      width={width}
      style={{
        display: 'block',
        borderRadius: `${headerTheme.borderRadius} ${footerTheme.borderRadius}`,
        overflow: 'hidden',
      }}
      head={<IFrameHead stylesheets={stylesheets} />}
    >
      <FrameProvider>
        <Global
          styles={{
            html: {
              fontFamily: containerTheme.fontFamily,
              borderRadius: `${headerTheme.borderRadius} ${footerTheme.borderRadius}`,
              height: '100%',
              margin: 0,
            },
            body: {
              fontFamily: containerTheme.fontFamily,
              borderRadius: `${headerTheme.borderRadius} ${footerTheme.borderRadius}`,
              height: '100%',
              margin: 0,
            },
          }}
        />
        <FrameContent height={height} {...props} />
      </FrameProvider>
    </Frame>
  );
}
