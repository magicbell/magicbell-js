import { useNotificationFactory } from '@magicbell/react-headless';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import NotificationState from '../../../../src/components/NotificationState';
import { sampleNotification } from '../../../factories/NotificationFactory';

test('renders a dot when the notification is unread', () => {
  const { result } = renderHook(() =>
    useNotificationFactory({ ...sampleNotification, readAt: null }),
  );

  const { container } = render(<NotificationState notification={result.current} />);

  const svg = container.querySelector('svg') as SVGElement;
  expect(svg.childNodes).toHaveLength(1);
});
