import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CloseBannerButton from '../../../../src/components/EnablePushNotificationsBanner/CloseBannerButton';

describe('components', () => {
  describe('CloseBannerButton', () => {
    let onClick: jest.Mock;
    let view: RenderResult;

    beforeEach(() => {
      onClick = jest.fn();

      view = render(<CloseBannerButton onClick={onClick} />);
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders a button with a close icon', () => {
        expect(view.container).toMatchSnapshot();
      });
    });

    describe('.handleClick', () => {
      it('calls the onClick callback', () => {
        const button = view.getByRole('button');
        userEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
