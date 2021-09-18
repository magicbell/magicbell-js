import { useNotificationFactory } from '@magicbell/react-headless';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NotificationState from '../../../../src/components/NotificationState';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('NotificationState', () => {
    let view: RenderResult;

    beforeEach(() => {
      const { result } = renderHook(() => useNotificationFactory(sampleNotification));

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <NotificationState notification={result.current} />
        </MagicBellThemeProvider>,
      );
    });

    describe('render', () => {
      describe('the notification is read', () => {
        beforeEach(() => {
          const { result } = renderHook(() =>
            useNotificationFactory({ ...sampleNotification, readAt: Date.now() }),
          );

          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationState notification={result.current} />
            </MagicBellThemeProvider>,
          );
        });

        it('renders an icon for the context menu', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the notification is unread', () => {
        beforeEach(() => {
          const { result } = renderHook(() =>
            useNotificationFactory({ ...sampleNotification, readAt: null }),
          );

          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationState notification={result.current} />
            </MagicBellThemeProvider>,
          );
        });

        it('renders a dot', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.handleClick', () => {
      it('renders the context menu', async () => {
        const bell = view.getByTestId('icon');
        userEvent.click(bell);

        await waitFor(() => expect(view.container).toMatchSnapshot());
      });

      describe('the menuPlacement is set to "top-end"', () => {
        beforeEach(() => {
          const { result } = renderHook(() => useNotificationFactory(sampleNotification));

          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationState notification={result.current} menuPlacement="top-end" />
            </MagicBellThemeProvider>,
          );
        });

        it('renders a menu in the specified position', async () => {
          userEvent.click(view.getByTestId('icon'));

          expect(await view.findByText('Delete')).toBeInTheDocument();
          await waitFor(() => expect(view.container).toMatchSnapshot());
        });
      });
    });

    describe('.onHover', () => {
      describe('the notification is unread', () => {
        it('renders the menu icon', async () => {
          userEvent.hover(view.getByTestId('icon'));

          await waitFor(() => expect(view.container).toMatchSnapshot());
        });
      });

      describe('.onBlur', () => {
        it('renders the dot icon', async () => {
          userEvent.hover(view.getByTestId('icon'));
          userEvent.unhover(view.getByTestId('icon'));

          await waitFor(() => expect(view.container).toMatchSnapshot());
        });
      });
    });
  });
});
