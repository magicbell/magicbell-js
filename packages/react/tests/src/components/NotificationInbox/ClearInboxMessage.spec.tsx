import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import ClearInboxMessage from '../../../../src/components/NotificationInbox/ClearInboxMessage';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { TranslationsProvider } from '../../../../src/context/TranslationsContext';
import { useLocale } from '../../../../src/lib/i18n';

describe('components', () => {
  describe('ClearInboxMessage', () => {
    let view: RenderResult;

    beforeEach(() => {
      const translations = useLocale('es');

      view = render(
        <TranslationsProvider value={translations}>
          <MagicBellThemeProvider value={defaultTheme}>
            <ClearInboxMessage />
          </MagicBellThemeProvider>
        </TranslationsProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders an image', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('default language', () => {
        it('renders the text in English', () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <ClearInboxMessage />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });
  });
});
