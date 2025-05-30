import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, render } from '@testing-library/react';
import * as React from 'react';

import { MagicBellProvider, useConfig } from '../../../../src';
import * as ajax from '../../../../src/lib/ajax';

setupMockServer(...mockHandlers);

describe('components', () => {
  describe('MagicBellProvider', () => {
    const apiKey = faker.random.alphaNumeric(40);
    const userExternalId = faker.datatype.uuid();

    it('renders the children', () => {
      act(() => {
        useConfig.setState({ lastFetchedAt: Date.now() });
      });

      const { container } = render(
        <MagicBellProvider apiKey={apiKey} userExternalId={userExternalId} disableRealtime>
          <p>We are gradually adding new functionality and we welcome your suggestions and feedback.</p>
          <p style={{ opacity: 0.5 }}>Please feel free to send us any additional feedback.</p>
        </MagicBellProvider>,
      );

      expect(container.innerHTML).toContain(
        'We are gradually adding new functionality and we welcome your suggestions and feedback.',
      );
    });

    it('fetches config', async () => {
      act(() => {
        useConfig.setState({ lastFetchedAt: null });
      });
      const spy = vi.spyOn(ajax, 'fetchAPI');

      render(
        <MagicBellProvider apiKey={apiKey} userExternalId={userExternalId}>
          <div id="children" />
        </MagicBellProvider>,
      );

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('/config');
      spy.mockRestore();
    });

    describe('config is fetched', () => {
      beforeEach(() => {
        act(() => {
          useConfig.setState({ lastFetchedAt: Date.now() });
        });
      });

      it('does not fetch config', async () => {
        const spy = vi.spyOn(ajax, 'fetchAPI');

        render(
          <MagicBellProvider apiKey={apiKey} userExternalId={userExternalId}>
            <div id="children" />
          </MagicBellProvider>,
        );

        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
    });
  });
});
