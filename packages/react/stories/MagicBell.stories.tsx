import { INotification } from '@magicbell/react-headless';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import MagicBell, { MagicBellProvider } from '../src';
import FloatingNotificationInbox from '../src/components/FloatingNotificationInbox';
import { MagicBellProps } from '../src/components/MagicBell';
import { IMagicBellTheme } from '../src/context/Theme';
import { DeepPartial } from '../src/lib/types';

interface IStory extends MagicBellProps {
  onAllRead: () => void;
  onNotificationClick: (notification: INotification) => void;
  theme: DeepPartial<IMagicBellTheme>;
}

export default {
  title: 'MagicBell/MagicBell',
  component: MagicBell,
  argTypes: {
    onAllRead: { action: 'onAllRead' },
    onNotificationClick: { action: 'onNotificationClick' },
  },
} as Meta;

const Template: Story<IStory> = ({ onAllRead, onNotificationClick, ...args }: IStory) => (
  <MagicBellProvider {...args}>
    <MagicBell {...args}>
      {(props) => (
        <FloatingNotificationInbox
          onAllRead={onAllRead}
          onNotificationClick={onNotificationClick}
          height={500}
          {...props}
        />
      )}
    </MagicBell>
  </MagicBellProvider>
);

export const Default = Template.bind({});
Default.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  locale: 'en',
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  BellIcon: (
    <svg viewBox="0 0 24 24">
      <path d="M10,21.75a2.087,2.087,0,0,0,4.005,0" />
      <line x1="12" y1="3" x2="12" y2="0.75" />
      <path d="M12,3a7.5,7.5,0,0,1,7.5,7.5c0,7.046,1.5,8.25,1.5,8.25H3s1.5-1.916,1.5-8.25A7.5,7.5,0,0,1,12,3Z" />
    </svg>
  ),
};

export const WithCustomTheme = Template.bind({});
WithCustomTheme.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  theme: {
    header: { backgroundColor: '#FAD776', textColor: '#161C2D' },
    footer: { backgroundColor: '#FAD776', textColor: '#161C2D' },
    notification: {
      unread: { backgroundColor: '#FAD776', backgroundOpacity: 0.1 },
    },
  },
};

export const WithInboxOpen = Template.bind({});
WithInboxOpen.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  defaultIsOpen: true,
};

export const WithCustomEmptyImage = Template.bind({});
WithCustomEmptyImage.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  images: {
    emptyInboxUrl:
      'https://thumbs.dreamstime.com/b/inbox-box-cabinet-document-empty-project-blue-icon-abstract-cloud-background-148443579.jpg',
  },
};

export const WithUnreadCount = Template.bind({});
WithUnreadCount.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  bellCounter: 'unread',
};

export const WithCustomBadge = Template.bind({});
WithCustomBadge.args = {
  ...Default.args,
  bellCounter: 'unread',
  Badge: ({ count }) => (
    <div
      style={{
        position: 'absolute',
        background: '#5225c1',
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        top: -4,
        right: -2,
        width: 16,
        height: 16,
        padding: 2,
        borderRadius: 8,
      }}
    >
      {count}
    </div>
  ),
};
