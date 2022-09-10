import { act, screen } from '@testing-library/react';
import React from 'react';

import Timestamp from '../../../../src/components/Timestamp';
import { renderWithProviders } from '../../../__utils__/render';

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
