import { Global } from '@emotion/core';
import { MagicBellContext } from '@magicbell/magicbell-react';
import { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React, { useContext } from 'react';
import Frame from 'react-frame-component';
import { useFrameSize } from '../../lib/window';
import FrameContent from '../FrameContent';
import FrameProvider from '../FrameProvider';

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
  width: defaultWidth,
  height: defaultHeight,
  stylesheets = [],
  ...props
}: IFrameProps) {
  const { theme } = useContext(MagicBellContext);
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
      head={
        <>
          {stylesheets.map((stylesheet: string) => (
            <link key={stylesheet} href={stylesheet} rel="stylesheet" />
          ))}
        </>
      }
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

IFrame.defaultProps = {
  width: 500,
  height: 600,
};
