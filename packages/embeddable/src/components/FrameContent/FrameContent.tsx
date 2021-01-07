import { NotificationInbox } from '@magicbell/magicbell-react';
import { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React, { Component } from 'react';
import { ReactError, UnhandledError } from '../../lib/error';

export type FrameContentProps = NotificationInboxProps;

/**
 * Content to be rendered by the iframe.
 *
 * @example
 * <FrameContent />
 */
export default class FrameContent extends Component<FrameContentProps> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    new ReactError(error, info).report();
  }

  componentDidMount() {
    window.onerror = function (message, source, lineno, colno, error) {
      new UnhandledError(error).report();
      // Prevents the firing of the default event handler
      return true;
    };
  }

  render() {
    const { props } = this;
    return <NotificationInbox {...props} />;
  }
}
