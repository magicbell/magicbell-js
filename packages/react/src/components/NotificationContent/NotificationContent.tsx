/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useEffect } from 'react';
import { cancel, render } from 'timeago.js';

export interface Props {
  notification: INotification;
}

/**
 * Component that renders the summary of a notification. The content of the
 * notification is compiled as a liquid template.
 *
 * @example
 * <NotificationContent notification={notification} />
 */
export default function NotificationContent({ notification }: Props) {
  const { sanitizedContent: markup } = notification;

  // TODO: Move this to a plugin framework
  useEffect(() => {
    const nodes = document.querySelectorAll('time[datetime]');
    if (nodes.length > 0) render(nodes);

    return () => {
      cancel();
    };
  }, [markup]);

  if (!markup || markup.replace(/(\n|\s|\r)/gi, '') === '') return null;
  return (
    <article
      css={css`
        color: inherit !important;
        cursor: inherit;
        margin: 0;
        line-height: 1.2;
        font-size: 0.865em !important;
        margin-top: 1em !important;
        word-break: break-word !important;
      `}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
