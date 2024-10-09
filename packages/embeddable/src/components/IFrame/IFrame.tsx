import { Global } from '@emotion/react';
import { FloatingNotificationInbox, useTheme } from '@magicbell/magicbell-react';
import React, { ComponentProps } from 'react';
import Frame from 'react-frame-component';

import { useFrameSize } from '../../lib/window.js';
import FrameContent from '../FrameContent/index.js';
import FrameProvider from '../FrameProvider/index.js';
import IFrameHead from './IFrameHead.js';

type NotificationInboxProps = Omit<ComponentProps<typeof FloatingNotificationInbox>, 'isOpen' | 'launcherRef'>;
export interface IFrameProps extends NotificationInboxProps {
  width?: number;
  height?: number;
  stylesheets?: string[];
}

/**
 * Responsive iframe.
 *
 * @exampleƒ
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
