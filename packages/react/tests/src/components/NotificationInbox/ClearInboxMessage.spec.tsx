import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { MagicBellContext } from '../../../../src';
import ClearInboxMessage from '../../../../src/components/NotificationInbox/ClearInboxMessage';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { TranslationsProvider } from '../../../../src/context/TranslationsContext';
import { useLocale } from '../../../../src/lib/i18n';
import { getDefaultNotificationStoreMap } from '../../../factories/NotificationStoresMapFactory';

describe('components', () => {
  describe('ClearInboxMessage', () => {
    let view: RenderResult;

    beforeEach(() => {
      const translations = useLocale('es');

      view = render(
        <TranslationsProvider value={translations}>
          <MagicBellThemeProvider value={defaultTheme}>
            <MagicBellContext.Provider value={{ rootStore: getDefaultNotificationStoreMap() }}>
              <ClearInboxMessage />
            </MagicBellContext.Provider>
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
              <MagicBellContext.Provider value={{ rootStore: getDefaultNotificationStoreMap() }}>
                <ClearInboxMessage />
              </MagicBellContext.Provider>
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });
  });
});
