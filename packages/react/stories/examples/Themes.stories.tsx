import { Meta } from '@storybook/react';
import React from 'react';

import FloatingNotificationInbox from '../../src/components/FloatingNotificationInbox';
import MagicBell from '../../src/components/MagicBell';
import { merge } from '../../src/lib/merge';

function Component({ onAllRead, onNotificationClick, ...props }) {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex-1" />
      <div>
        <MagicBell {...props}>
          {(props) => (
            <FloatingNotificationInbox
              onAllRead={onAllRead}
              onNotificationClick={onNotificationClick}
              height={600}
              {...props}
              placement="bottom-end"
            />
          )}
        </MagicBell>
      </div>
    </nav>
  );
}

const meta: Meta = {
  component: Component,
  argTypes: {
    onAllRead: { action: 'onAllRead' },
    onNotificationClick: { action: 'onNotificationClick' },
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    defaultIsOpen: true,
  },
};

export default meta;

export const All = {
  parameters: { theme: 'all' },
};

export const Default = {
  parameters: {
    theme: 'default',
  },
};

export const DarkTheme = merge(Default, {
  parameters: {
    theme: 'dark',
  },
});

export const LightTheme = merge(Default, {
  parameters: {
    theme: 'light',
  },
});

export const Outline = merge(Default, {
  parameters: {
    theme: 'outline',
  },
});
