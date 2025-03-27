import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, screen } from '@testing-library/react';
import * as React from 'react';

import Timestamp from '../../../../src/components/Timestamp';
import { renderWithProviders } from '../../../__utils__/render';

setupMockServer(...mockHandlers);

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(1600599000000);
});

afterEach(() => {
  vi.useRealTimers();
});

test('renders the relative date', async () => {
  renderWithProviders(<Timestamp date={new Date()} delay={0} />);
  act(() => {
    vi.advanceTimersByTime(60_000);
  });

  screen.getByText(/1m/i);
});

test('updates the relative date text', async () => {
  renderWithProviders(<Timestamp date={new Date()} delay={0} />);
  act(() => {
    vi.advanceTimersByTime(180_000);
  });

  screen.getByText(/3m/i);
});
