import '@testing-library/jest-dom/extend-expect';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Sinon from 'sinon';
import Timestamp from '../../../../src/components/Timestamp';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';

describe('components', () => {
  describe('Timestamp', () => {
    let clock: Sinon.SinonFakeTimers;
    let view: RenderResult;

    beforeEach(() => {
      clock = Sinon.useFakeTimers(1600599000000);
      const date = new Date();
      clock.tick(60_000);

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <Timestamp date={date} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
      clock.restore();
    });

    describe('render', () => {
      it('renders the relative date', () => {
        expect(view.container).toMatchSnapshot();
      });

      it('updates the relative date text', () => {
        act(() => {
          clock.tick(120_000);
        });

        expect(view.container).toHaveTextContent('3m');
      });
    });

    describe('.onHover', () => {
      it('renders a tooltip', async () => {
        userEvent.hover(view.getByText('1m'));

        await waitFor(() => expect(view.container).toMatchSnapshot());
      });

      describe('the tooltipPlacement property is set to "left-end"', () => {
        beforeEach(() => {
          view.unmount();
          view = render(
            <MagicBellThemeProvider value={defaultTheme}>
              <Timestamp date={new Date()} tooltipPlacement="left-end" />
            </MagicBellThemeProvider>,
          );
        });

        it('renders a menu in the specified position', async () => {
          userEvent.hover(view.getByText('0s'));

          expect(await view.findByText('September 20, 2020 6:51 AM')).toBeInTheDocument();
        });
      });
    });
  });
});
