import { screen, render, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
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
  renderWithProviders(<Timestamp date={new Date()} />);
  act(() => {
    jest.advanceTimersByTime(60_000);
  });

  screen.getByText(/1m/i);
});

test('updates the relative date text', async () => {
  renderWithProviders(<Timestamp date={new Date()} />);
  act(() => {
    jest.advanceTimersByTime(180_000);
  });

  screen.getByText(/3m/i);
});

test('renders a tooltip showing the date in expanded format', async () => {
  renderWithProviders(<Timestamp date={new Date()} />);
  act(() => {
    jest.advanceTimersByTime(60_000);
  });

  const date = screen.getByText(/1m/i);
  userEvent.hover(date);

  await waitFor(() => screen.getByText(/September 20, 2020 6:50 AM/i));
});

test('renders a menu in the specified position', async () => {
  render(<Timestamp date={new Date()} tooltipPlacement="left-end" />);
  act(() => {
    jest.advanceTimersByTime(60_000);
  });

  const date = screen.getByText(/1m/i);
  userEvent.hover(date);

  const tooltip = await waitFor(() => screen.getByText(/September 20, 2020 6:50 AM/i));
  expect(tooltip.parentElement!.style.transform).toEqual('translate(-10px, 0px)');
});
