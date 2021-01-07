import { NotificationInbox } from '@magicbell/magicbell-react';
import { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React, { Component } from 'react';
import { reportError } from '../../lib/error';

export type FrameContentProps = NotificationInboxProps;

/**
 * Content to be rendered by the iframe.
 *
 * @example
 * <FrameContent />
 */
export default class FrameContent extends Component<FrameContentProps> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportError(error, info);
  }

  render() {
    const { props } = this;
    return <NotificationInbox {...props} />;
  }
}
