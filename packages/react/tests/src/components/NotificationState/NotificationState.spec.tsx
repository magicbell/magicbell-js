import { useNotificationFactory } from '@magicbell/react-headless';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { render, renderHook } from '@testing-library/react';
import * as React from 'react';

import NotificationState from '../../../../src/components/NotificationState';
import { sampleNotification } from '../../../factories/NotificationFactory';

setupMockServer(...mockHandlers);

test('renders a dot when the notification is unread', () => {
  const { result } = renderHook(() => useNotificationFactory({ ...sampleNotification, readAt: null }));

  const { container } = render(<NotificationState notification={result.current} />);

  const svg = container.querySelector('svg') as SVGElement;
  expect(svg.childNodes).toHaveLength(1);
});
