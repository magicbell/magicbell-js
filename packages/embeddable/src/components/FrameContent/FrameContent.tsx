import { NotificationInbox } from '@magicbell/magicbell-react';
import { NotificationInboxProps } from '@magicbell/magicbell-react/dist/components/NotificationInbox';
import React, { Component } from 'react';

export type FrameContentProps = NotificationInboxProps;

/**
 * Content to be rendered by the iframe.
 *
 * @example
 * <FrameContent />
 */
export default class FrameContent extends Component<FrameContentProps> {
  render() {
    const { props } = this;
    return <NotificationInbox {...props} />;
  }
}
