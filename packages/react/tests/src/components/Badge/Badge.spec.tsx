import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import UnseenBadge from '../../../../src/components/Badge';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';

describe('components', () => {
  describe('UnseenBadge', () => {
    let count: number;
    let view: RenderResult;

    beforeEach(() => {
      count = 3;

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <UnseenBadge count={count} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders the count', () => {
        expect(view.container).toMatchSnapshot();
      });
    });
  });
});
