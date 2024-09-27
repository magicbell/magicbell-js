import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, renderHook } from '@testing-library/react';

import useMagicBellEvent from '../../../src/hooks/useMagicBellEvent.js';
import { eventAggregator } from '../../../src/lib/realtime.js';
import clientSettings from '../../../src/stores/clientSettings.js';

setupMockServer(...mockHandlers);

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

describe('hooks', () => {
  describe('useMagicBellEvent', () => {
    it('invokes the handler function when an event is emmited', () => {
      const eventName = faker.random.alphaNumeric();
      const handler = jest.fn();
      const data = faker.helpers.objectValue({});

      renderHook(() => useMagicBellEvent(eventName, handler));

      act(() => {
        eventAggregator.emit(eventName, { data, source: 'remote' });
      });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(data, 'remote');
    });

    it('cleans up on unmount', async () => {
      const eventName = faker.random.alphaNumeric();
      const handler = jest.fn();
      const data = faker.helpers.objectValue({});

      const { unmount } = renderHook(() => useMagicBellEvent(eventName, handler));

      await act(async () => {
        await unmount();
      });

      eventAggregator.emit(eventName, { data, source: 'remote' });

      expect(handler).not.toHaveBeenCalled();
    });

    describe('when listening to remote events only', () => {
      describe('when the emitted event is not remote', () => {
        it('does not invoke the handler function', () => {
          const eventName = faker.random.alphaNumeric();
          const handler = jest.fn();
          const data = faker.helpers.objectValue({});

          renderHook(() => useMagicBellEvent(eventName, handler, { source: 'remote' }));

          act(() => {
            eventAggregator.emit(eventName, { data, source: 'local' });
          });

          expect(handler).not.toHaveBeenCalled();
        });
      });
    });

    describe('when listening to local events only', () => {
      describe('when the emitted event is not local', () => {
        it('does not invoke the handler function', () => {
          const eventName = faker.random.alphaNumeric();
          const handler = jest.fn();
          const data = faker.helpers.objectValue({});

          renderHook(() => useMagicBellEvent(eventName, handler, { source: 'local' }));

          act(() => {
            eventAggregator.emit(eventName, { data, source: 'remote' });
          });

          expect(handler).not.toHaveBeenCalled();
        });
      });
    });
  });
});
