import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import FetchErrorMessage from '../../../../../src/components/NotificationInbox/error/FetchErrorMessage';
import { MagicBellThemeProvider } from '../../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../../src/context/Theme';

describe('components', () => {
  describe('FetchErrorMessage', () => {
    let view: RenderResult;

    beforeEach(() => {
      Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      describe('the navigator has an internet connection', () => {
        it('renders an API error message', () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.navigator.onLine = true;
          view = render(
            <MagicBellThemeProvider value={defaultTheme}>
              <FetchErrorMessage />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the navigator does not have an internet connection', () => {
        it('renders a connection error message', () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.navigator.onLine = false;
          view = render(
            <MagicBellThemeProvider value={defaultTheme}>
              <FetchErrorMessage />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });
  });
});
