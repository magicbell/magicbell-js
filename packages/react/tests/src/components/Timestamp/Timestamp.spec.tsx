import { act, screen } from '@testing-library/react';
import * as React from 'react';

import Timestamp from '../../../../src/components/Timestamp';
import { renderWithProviders } from '../../../__utils__/render';

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(1600599000000);
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders the relative date', async () => {
  renderWithProviders(<Timestamp date={new Date()} delay={0} />);
  act(() => {
    jest.advanceTimersByTime(60_000);
  });

  screen.getByText(/1m/i);
});

test('updates the relative date text', async () => {
  renderWithProviders(<Timestamp date={new Date()} delay={0} />);
  act(() => {
    jest.advanceTimersByTime(180_000);
  });

  screen.getByText(/3m/i);
});
