import { useConfig } from '@magicbell/react-headless';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import FloatingNotificationInbox from '../../../../src/components/FloatingNotificationInbox';
import { renderWithProviders as render } from '../../../__utils__/render';
import { createServer } from '../../../__utils__/server';
import { sampleConfig } from '../../../factories/ConfigFactory';
import { sampleNotification } from '../../../factories/NotificationFactory';

const stores = [
  {
    id: 'default',
    defaultQueryParams: {},
    defaults: { notifications: [sampleNotification], lastFetchedAt: Date.now() },
  },
];

let server: ReturnType<typeof createServer>;

beforeEach(async () => {
  server = createServer();

  act(() => {
    useConfig.setState({ ...sampleConfig, lastFetchedAt: Date.now() });
  });
});

afterEach(() => {
  server.shutdown();
});

test('does not render the inbox on load', () => {
  render(<FloatingNotificationInbox isOpen={false} launcherRef={{ current: null }} />);
  expect(screen.queryByRole('heading', { name: /notifications/i })).not.toBeInTheDocument();
});

test('renders the tooltip in the correct place', () => {
  const ref = React.createRef<any>();

  const bottomEnd = render(
    <>
      <div data-testid="ref" ref={ref} />
      <FloatingNotificationInbox launcherRef={ref} height={350} placement="bottom-end" isOpen />
    </>,
  );

  const tippyBottom = bottomEnd.container.querySelector<HTMLDivElement>('[data-tippy-root]');
  expect(tippyBottom!.style.transform).toEqual('translate(0px, 10px)');

  const topCenter = render(
    <>
      <div data-testid="ref" ref={ref} />
      <FloatingNotificationInbox launcherRef={ref} height={350} placement="top-end" isOpen />
    </>,
  );

  const tippyTop = topCenter.container.querySelector<HTMLDivElement>('[data-tippy-root]');
  expect(tippyTop!.style.transform).toEqual('translate(0px, -10px)');
});

test('does not render the pointing arrow if hideArrow is provided', () => {
  const ref = React.createRef<any>();

  const view = render(
    <>
      <div data-testid="ref" ref={ref} />
      <FloatingNotificationInbox launcherRef={ref} height={350} hideArrow isOpen />
    </>,
  );

  expect(view.container.querySelector('[data-popper-arrow]')).not.toBeInTheDocument();
});

test('can render the inbox with a custom layout', async () => {
  const ref = React.createRef<any>();

  render(
    <>
      <div ref={ref} />
      <FloatingNotificationInbox
        launcherRef={ref}
        height={350}
        layout={['footer', 'content', 'header']}
        isOpen
      />
    </>,
    { stores },
  );

  screen.getByRole('heading', {
    name: /notifications/i,
  });

  screen.getByText(/new comment: tables in knowledgebase/i);

  screen.getByRole('img', {
    name: /magicbell logo/i,
  });
});

test('toggles the notification inbox', async () => {
  const ref = React.createRef<any>();
  const onClick = jest.fn();

  render(
    <>
      <div ref={ref} />
      <FloatingNotificationInbox launcherRef={ref} height={350} isOpen toggle={onClick} />
    </>,
  );

  const title = await screen.findByRole('button', { name: sampleNotification.title });
  await userEvent.click(title);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('calls the onNotificationClick callback', async () => {
  const ref = React.createRef<any>();
  const onClick = jest.fn();

  render(
    <>
      <div ref={ref} />
      <FloatingNotificationInbox
        launcherRef={ref}
        height={350}
        isOpen
        onNotificationClick={onClick}
      />
    </>,
  );

  const title = await screen.findByRole('button', { name: sampleNotification.title });
  await userEvent.click(title);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('opens the action url in the same window', async () => {
  const ref = React.createRef<any>();
  const onClick = jest.fn();

  render(
    <>
      <div ref={ref} />
      <FloatingNotificationInbox
        launcherRef={ref}
        height={350}
        isOpen
        onNotificationClick={onClick}
      />
    </>,
  );

  const title = await screen.findByRole('button', { name: sampleNotification.title });
  await userEvent.click(title);

  expect(global.open).toHaveBeenCalledTimes(1);
  expect(global.open).toHaveBeenCalledWith(sampleNotification.actionUrl, '_self');
});
