import { IRemoteNotification, pushEventAggregator } from '@magicbell/react-headless';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import CallbackHandler from '../../../../src/components/CallbackHandler';
import NotificationFactory from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('CallbackHandler', () => {
    let onNewNotification: (notification: IRemoteNotification) => void;

    let view: RenderResult;

    beforeEach(() => {
      onNewNotification = jest.fn();
      view = render(<CallbackHandler onNewNotification={onNewNotification} />);
    });

    describe('render', () => {
      it('does not render anything', () => {
        expect(view.container).toBeEmptyDOMElement();
      });
    });

    describe('.handleNewNotification', () => {
      it('marks the notification as read', () => {
        const notification = NotificationFactory.build();
        pushEventAggregator.emit('notifications.new', notification);

        expect(onNewNotification).toHaveBeenCalledTimes(1);
        expect(onNewNotification).toHaveBeenCalledWith(notification);
      });
    });
  });
});
