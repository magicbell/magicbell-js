import { Meta } from '@storybook/react';
import React from 'react';

import FloatingNotificationInbox from '../src/components/FloatingNotificationInbox';
import MagicBell from '../src/components/MagicBell';

function Component({ onAllRead, onNotificationClick, ...props }) {
  const auth = {
    apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
    userEmail: 'josue@magicbell.io',
    userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex-1" />
      <div>
        <MagicBell {...auth} {...props}>
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
  title: 'Examples/Themes',
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

export const DarkTheme = {
  ...Default,
  parameters: {
    theme: 'dark',
  },
};

export const LightTheme = {
  ...Default,
  parameters: {
    theme: 'light',
  },
};

export const Outline = {
  ...Default,
  parameters: {
    theme: 'outline',
  },
};
