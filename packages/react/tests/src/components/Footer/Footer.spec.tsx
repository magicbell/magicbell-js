import { useConfig } from '@magicbell/react-headless';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import Footer from '../../../../src/components/Footer';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import ConfigFactory from '../../../factories/ConfigFactory';

describe('components', () => {
  describe('Footer', () => {
    let view: RenderResult;

    beforeEach(() => {
      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <Footer />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders a link to the magicbell site', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('the customer has branding disabled', () => {
        beforeEach(() => {
          act(() => {
            useConfig.setState(
              ConfigFactory.build({
                inbox: {
                  features: {
                    noMagicbellBranding: { enabled: true },
                  },
                },
              }),
            );
          });
        });

        it('does not renders the magicbell logo', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the customer has notification preferences disabled', () => {
        beforeEach(() => {
          act(() => {
            useConfig.setState(
              ConfigFactory.build({
                inbox: {
                  features: {
                    notificationPreferences: { enabled: false },
                  },
                },
              }),
            );
          });
        });

        it('does not renders the toggle button', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.toggleUserPreferences', () => {
      it('shows the user preferences panel', () => {
        const button = view.getByRole('button');
        fireEvent.click(button);

        expect(view.container).toMatchSnapshot();
      });
    });
  });
});
