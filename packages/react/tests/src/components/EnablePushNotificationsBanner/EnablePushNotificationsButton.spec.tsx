import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { EnablePushNotificationsButton } from '../../../../src/components/EnablePushNotificationsBanner';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';

describe('components', () => {
  describe('EnablePushNotificationsButton', () => {
    let onClick: jest.Mock;
    let view: RenderResult;

    beforeEach(() => {
      onClick = jest.fn();

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <EnablePushNotificationsButton onClick={onClick} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders a styled button', () => {
        expect(view.container).toMatchSnapshot();
      });
    });

    describe('.handleClick', () => {
      it('calls the onClick callback', () => {
        const button = view.getByRole('button');
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
