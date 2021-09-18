import { clientSettings, useConfig } from '@magicbell/react-headless';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import EnablePushNotificationsBanner from '../../../../src/components/EnablePushNotificationsBanner/EnablePushNotificationsBanner';
import ConfigFactory, { sampleConfig } from '../../../factories/ConfigFactory';

describe('components', () => {
  describe('EnablePushNotificationsBanner', () => {
    let view: RenderResult;

    beforeEach(() => {
      clientSettings.setState({ apiKey: 'cf63e9f2fcb30bcd58eb' });
      useConfig.setState({
        ...sampleConfig,
        lastFetchedAt: Date.now(),
      });
      localStorage.clear();

      view = render(<EnablePushNotificationsBanner />);
    });

    describe('render', () => {
      describe('the user did not enable push notifications before', () => {
        it('renders a button to enable push notifications', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the user has enabled push notifications before', () => {
        beforeEach(() => {
          localStorage.setItem(
            'magicbell:cf63e9f2fcb30bcd58eb:web-push-requested-at',
            JSON.stringify(Date.now()),
          );
          view = render(<EnablePushNotificationsBanner />);
        });

        afterEach(() => {
          localStorage.clear();
        });

        it('does not render anything', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the web push channel is disabled', () => {
        beforeEach(() => {
          act(() => {
            useConfig.setState({
              ...ConfigFactory.build({ channels: { webPush: { enabled: false } } }),
              lastFetchedAt: Date.now(),
            });
          });

          view = render(<EnablePushNotificationsBanner />);
        });

        it('does not render anything', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.enablePushNotifications', () => {
      it('opens a new window to create the push subscription', () => {
        window.open = jest.fn();
        const button = view.getAllByRole('button')[0];
        fireEvent.click(button);

        expect(window.open).toHaveBeenCalledTimes(1);
      });
    });

    describe('.closeBanner', () => {
      it('closes the banner', () => {
        const button = view.getAllByRole('button')[1];
        fireEvent.click(button);

        expect(view.container).toMatchSnapshot();
      });
    });
  });
});
