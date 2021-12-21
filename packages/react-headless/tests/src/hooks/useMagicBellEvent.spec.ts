import { act, renderHook } from '@testing-library/react-hooks';
import faker from 'faker';

import useMagicBellEvent from '../../../src/hooks/useMagicBellEvent';
import { pushEventAggregator } from '../../../src/lib/realtime';

describe('hooks', () => {
  describe('useMagicBellEvent', () => {
    it('invokes the handler function when an event is emmited', () => {
      const eventName = faker.random.alphaNumeric();
      const handler = jest.fn();
      const data = faker.random.objectElement();

      renderHook(() => useMagicBellEvent(eventName, handler));

      act(() => {
        pushEventAggregator.emit(eventName, data);
      });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(data);
    });

    it('cleans up on unmount', async () => {
      const eventName = faker.random.alphaNumeric();
      const handler = jest.fn();
      const { unmount } = renderHook(() => useMagicBellEvent(eventName, handler));

      await act(async () => {
        await unmount();
      });

      pushEventAggregator.emit(eventName, {});

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
