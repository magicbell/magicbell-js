/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useEffect, useRef } from 'react';
import { cancel, render } from 'timeago.js';

import { useProse } from '../ClickableNotification/prose';

export interface Props {
  notification: INotification;
  prose?: boolean;
}

/**
 * Component that renders the summary of a notification. The content of the
 * notification is compiled as a liquid template.
 *
 * @example
 * <NotificationContent notification={notification} />
 */
export default function NotificationContent({ notification, prose: withProse = true }: Props) {
  const { sanitizedContent: markup } = notification;
  const ref = useRef<HTMLElement>(null);

  const prose = useProse();

  // TODO: Move this to a plugin framework
  useEffect(() => {
    if (!ref.current) return;
    const nodes = ref.current.querySelectorAll('time[datetime]');
    if (nodes.length > 0) render(nodes);

    return () => {
      cancel();
    };
  }, [markup]);

  if (!markup || markup.replace(/(\n|\s|\r)/gi, '') === '') return null;

  const style = css`
    color: inherit !important;
    cursor: inherit;
    margin: 0;
    line-height: ${withProse ? 'inherit' : '1.5 !important'};
    margin-top: 8px !important;
    word-break: break-word !important;
  `;

  return <article ref={ref} css={withProse ? [style, prose] : style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
