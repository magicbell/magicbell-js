import { useNotificationPreferences } from '@magicbell/react-headless';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Server } from 'miragejs';
import React from 'react';
import UserPreferencesPanel from '../../../../src/components/UserPreferencesPanel';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { TranslationsProvider } from '../../../../src/context/TranslationsContext';
import { useLocale } from '../../../../src/lib/i18n';

describe('components', () => {
  describe('UserPreferencesPanel', () => {
    let onClose: () => void;
    let view: RenderResult;
    let server;

    beforeEach(() => {
      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.com',
        timing: 50,
      });

      server.get('/notification_preferences', {
        notification_preferences: {
          categories: {
            comments: { email: false },
          },
        },
      });

      onClose = jest.fn();

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <UserPreferencesPanel onClose={onClose} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
      server.shutdown();
    });

    it('fetches notification preferences', async () => {
      const { waitForValueToChange, result } = renderHook(() => useNotificationPreferences());
      const spy = jest.spyOn(result.current, 'fetch');

      render(
        <MagicBellThemeProvider value={defaultTheme}>
          <UserPreferencesPanel onClose={onClose} />
        </MagicBellThemeProvider>,
      );

      expect(spy).toHaveBeenCalledTimes(1);
      await waitForValueToChange(() => result.current.categories);
    });

    describe('render', () => {
      describe('before preferences are fetched', () => {
        it('renders a container for notification preferences', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('after preferences are fetched', () => {
        it('renders preferences for all categories', async () => {
          const { waitForValueToChange, result } = renderHook(() => useNotificationPreferences());
          await waitForValueToChange(() => result.current.categories);

          expect(view.container).toMatchSnapshot();
        });
      });

      describe('localization', () => {
        it('renders localized strings', async () => {
          const definitions = useLocale('es');
          render(
            <TranslationsProvider value={definitions}>
              <MagicBellThemeProvider value={defaultTheme}>
                <UserPreferencesPanel onClose={onClose} />
              </MagicBellThemeProvider>
            </TranslationsProvider>,
          );

          expect(await screen.findByText('PREFERENCIAS')).toBeInTheDocument();
        });
      });
    });

    describe('.handleClose', () => {
      it('calls the onClose callback', () => {
        fireEvent.click(view.getByRole('button'));

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledWith();
      });
    });
  });
});
