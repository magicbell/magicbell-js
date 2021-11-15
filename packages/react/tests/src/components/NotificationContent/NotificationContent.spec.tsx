import { useNotificationFactory } from '@magicbell/react-headless';
import { act, render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import Sinon from 'sinon';
import { NotificationContent } from '../../../../src';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('NotificationContent', () => {
    let view: RenderResult;

    describe('render', () => {
      describe('sanitization', () => {
        it('renders the content as returned from the API', async () => {
          const { result } = renderHook(() =>
            useNotificationFactory({
              ...sampleNotification,
              content: `
            <p>Hello, <a href="javascript:alert('Hacked')">click here.</a></p>
            <img src="null" onerror="alert('Hacked')">
            `,
            }),
          );

          await act(async () => {
            view = render(<NotificationContent notification={result.current} />);
          });

          expect(view.container).toMatchSnapshot();
        });
      });

      describe('relative datetime', () => {
        let clock: Sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = Sinon.useFakeTimers(1615373877120);
        });

        afterEach(() => {
          clock.restore();
        });

        it('replaces the content of time tags with a relative datetime', async () => {
          const { result } = renderHook(() =>
            useNotificationFactory({
              ...sampleNotification,
              content:
                '<p>The event starts <time datetime="2021-03-11T05:33:12Z">on March 11</time>.</p>',
            }),
          );

          await act(async () => {
            view = render(<NotificationContent notification={result.current} />);
          });

          expect(view.container).toMatchSnapshot();
        });
      });
    });
  });
});
