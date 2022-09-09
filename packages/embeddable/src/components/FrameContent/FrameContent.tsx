import { NotificationInbox } from '@magicbell/magicbell-react';
import React, { Component, ComponentProps } from 'react';
import { ReactError } from '../../lib/error';

export type FrameContentProps = ComponentProps<typeof NotificationInbox>;

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
