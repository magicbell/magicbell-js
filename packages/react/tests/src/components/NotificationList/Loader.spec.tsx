import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import Loader from '../../../../src/components/NotificationList/Loader';

describe('components', () => {
  describe('NotificationList', () => {
    describe('Loader', () => {
      let view: RenderResult;

      beforeEach(() => {
        view = render(<Loader />);
      });

      afterEach(() => {
        view.unmount();
      });

      describe('render', () => {
        it('renders an animated loader', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });
  });
});
