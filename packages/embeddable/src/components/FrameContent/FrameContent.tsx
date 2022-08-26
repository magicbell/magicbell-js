import { NotificationInbox } from '@magicbell/magicbell-react';
import type { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React, { Component } from 'react';
import { ReactError } from '../../lib/error';

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

  render() {
    const { props } = this;
    return <NotificationInbox {...props} />;
  }
}
