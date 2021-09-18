import { buildStore, INotification } from '@magicbell/react-headless';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import Sinon from 'sinon';
import NotificationList, { ListItemProps } from '../../../../src/components/NotificationList';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('NotificationList', () => {
    let clock;
    let notifications;
    let onItemClick: (notification: INotification) => void;
    let view: RenderResult;

    beforeEach(() => {
      // The relative time has to be deterministic for snapshots.
      clock = Sinon.useFakeTimers();
      notifications = buildStore({ notifications: [sampleNotification] });
      onItemClick = jest.fn();

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <NotificationList notifications={notifications} onItemClick={onItemClick} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      clock.restore();
    });

    describe('render', () => {
      beforeEach(async () => {
        notifications = buildStore({ notifications: [] });

        view.rerender(
          <MagicBellThemeProvider value={defaultTheme}>
            <NotificationList notifications={notifications} onItemClick={onItemClick} />
          </MagicBellThemeProvider>,
        );
      });

      describe('the store is empty', () => {
        it('renders an empty list', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('the store is not empty', () => {
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
      it('renders a list rendering the custom component for each item', () => {
        function CustomListItem({ notification }: ListItemProps) {
          return <p>{notification.title}</p>;
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
