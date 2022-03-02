import { INotification } from '@magicbell/react-headless';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import FloatingNotificationInbox from '../src/components/FloatingNotificationInbox';
import MagicBell, { MagicBellProps } from '../src/components/MagicBell';
import { IMagicBellTheme } from '../src/context/Theme';
import { DeepPartial } from '../src/lib/types';

interface IStory extends MagicBellProps {
  onAllRead: () => void;
  onNotificationClick: (notification: INotification) => void;
  theme: DeepPartial<IMagicBellTheme>;
}

export default {
  title: 'Examples/Dark theme',
  component: MagicBell,
  argTypes: {
    onAllRead: { action: 'onAllRead' },
    onNotificationClick: { action: 'onNotificationClick' },
  },
} as Meta;

const Template: Story<IStory> = ({ onAllRead, onNotificationClick, ...args }: IStory) => (
  <div
    style={{
      height: '600px',
      width: '1200px',
      maxWidth: '80vw',
      backgroundColor: '#101318',
      margin: 0,
    }}
  >
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex-1" />
      <div>
        <MagicBell {...args}>
          {(props) => (
            <FloatingNotificationInbox
              onAllRead={onAllRead}
              onNotificationClick={onNotificationClick}
              height={600}
              {...props}
            />
          )}
        </MagicBell>
      </div>
    </nav>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  theme: {
    icon: { borderColor: 'white' },
    header: {
      backgroundColor: '#FAD776',
      backgroundOpacity: 0,
      borderRadius: '4px',
      textColor: 'white',
    },
    footer: {
      backgroundColor: '#333A40',
      backgroundOpacity: 1,
      borderRadius: '4px',
      textColor: 'white',
    },
    container: { backgroundColor: '#333A40', textColor: 'white' },
    notification: {
      default: { backgroundColor: '#333A40', borderRadius: '4px', textColor: 'white' },
      unread: {
        backgroundColor: '#212328',
        backgroundOpacity: 0.75,
        borderRadius: '4px',
        textColor: 'white',
      },
      unseen: {
        backgroundColor: '#009FF6',
        backgroundOpacity: 0.2,
        borderRadius: '4px',
        textColor: 'white',
      },
    },
  },
};
