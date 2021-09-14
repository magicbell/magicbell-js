import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../../../../src/components/Header';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { TranslationsProvider } from '../../../../src/context/TranslationsContext';
import { useLocale } from '../../../../src/lib/i18n';

describe('components', () => {
  describe('Header', () => {
    let onAllRead: () => void;
    let view: RenderResult;

    beforeEach(() => {
      onAllRead = jest.fn();
      const definitions = useLocale('es');

      view = render(
        <TranslationsProvider value={definitions}>
          <MagicBellThemeProvider value={defaultTheme}>
            <Header onAllRead={onAllRead} />
          </MagicBellThemeProvider>
        </TranslationsProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders a title and a button to mark all notification as read', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('default language', () => {
        it('renders a title in english', () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <Header onAllRead={onAllRead} />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.handleClick', () => {
      it('invokes the onAllRead callback', async () => {
        userEvent.click(view.getByTestId('mark-all-as-read'));
        await waitFor(() => expect(onAllRead).toBeCalledTimes(1));
      });
    });
  });
});
