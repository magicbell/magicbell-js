import { act, render, RenderResult } from '@testing-library/react';
import React from 'react';
import Sinon from 'sinon';
import NotificationList, { ListItemProps } from '../../../../src/components/NotificationList';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('NotificationList', () => {
    let notifications;
    let onItemClick: (notification: Notification) => void;
    let view: RenderResult;

    beforeEach(() => {
      notifications = {};
      onItemClick = jest.fn();

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <NotificationList notifications={notifications} onItemClick={onItemClick} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      describe('the collection is empty', () => {
        it('renders an empty list', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('the collection is not empty', () => {
      let clock;

      beforeEach(async () => {
        // The relative time has to be deterministic for snapshots.
        clock = Sinon.useFakeTimers();

        await act(async () => {
          notifications.push(sampleNotification);
        });
      });

      afterEach(() => {
        clock.restore();
      });

      it('renders a virtual list with all items', () => {
        expect(view.container).toMatchSnapshot();
      });
    });

    describe('a height is provided', () => {
      it('renders a list with the given height', () => {
        view.rerender(
          <MagicBellThemeProvider value={defaultTheme}>
            <NotificationList
              notifications={notifications}
              onItemClick={onItemClick}
              height={300}
            />
          </MagicBellThemeProvider>,
        );

        expect(view.container).toMatchSnapshot();
      });
    });

    describe('a custom ListItem is provided', () => {
      beforeEach(async () => {
        await act(async () => {
          notifications.push(sampleNotification);
        });
      });

      it('renders a list rendering the custom component for each item', () => {
        function CustomListItem(props: ListItemProps) {
          return <p>{props.notification.title}</p>;
        }

        view.rerender(
          <MagicBellThemeProvider value={defaultTheme}>
            <NotificationList
              notifications={notifications}
              onItemClick={onItemClick}
              height={300}
              ListItem={CustomListItem}
            />
          </MagicBellThemeProvider>,
        );

        expect(view.container).toMatchSnapshot();
      });
    });
  });
});
