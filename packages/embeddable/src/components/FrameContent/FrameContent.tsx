import { NotificationInbox } from '@magicbell/magicbell-react';
import { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React, { Component } from 'react';
import { reportReactError, reportUnhandledError } from '../../lib/error';

export type FrameContentProps = NotificationInboxProps;

/**
 * Content to be rendered by the iframe.
 *
 * @example
 * <FrameContent />
 */
export default class FrameContent extends Component<FrameContentProps> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportReactError(error, info);
  }

  componentDidMount() {
    window.onerror = function (message, source, lineno, colno, error) {
      reportUnhandledError(error);
      // Prevents the firing of the default event handler
      return true;
    };
  }

  render() {
    const { props } = this;
    return <NotificationInbox {...props} />;
  }
}
