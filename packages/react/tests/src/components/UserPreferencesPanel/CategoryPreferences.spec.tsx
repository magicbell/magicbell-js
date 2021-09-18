import { useNotificationPreferences } from '@magicbell/react-headless';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import CategoryPreferences from '../../../../src/components/UserPreferencesPanel/CategoryPreferences';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';

describe('components', () => {
  describe('CategoryPreferences', () => {
    let view: RenderResult;

    beforeEach(() => {
      useNotificationPreferences.setState({
        categories: {
          comments: { email: false, webPush: true, inApp: true },
          new_reply: { email: true, webPush: false, inApp: false },
        },
        lastFetchedAt: Date.now(),
      });

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <CategoryPreferences category="comments" />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders a checkbox for each channel', () => {
        expect(view.container).toMatchSnapshot();
      });
    });

    describe('.updatePreferences', () => {
      it('updates the preferences for the inApp category', async () => {
        const { result } = renderHook(() => useNotificationPreferences());
        const spy = jest.spyOn(result.current, 'save');

        const inAppCheckbox = view.getAllByRole('checkbox')[0];
        fireEvent.click(inAppCheckbox);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.current.categories).toMatchObject({ comments: { inApp: false } });
      });

      it('updates the preferences for the email category', async () => {
        const { result } = renderHook(() => useNotificationPreferences());
        const spy = jest.spyOn(result.current, 'save');

        const emailCheckbox = view.getAllByRole('checkbox')[1];
        fireEvent.click(emailCheckbox);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.current.categories).toMatchObject({ comments: { email: true } });
      });

      it('updates the preferences for the webPush category', async () => {
        const { result } = renderHook(() => useNotificationPreferences());
        const spy = jest.spyOn(result.current, 'save');

        const webPushCheckbox = view.getAllByRole('checkbox')[2];
        fireEvent.click(webPushCheckbox);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result.current.categories).toMatchObject({ comments: { webPush: false } });
      });
    });
  });
});
