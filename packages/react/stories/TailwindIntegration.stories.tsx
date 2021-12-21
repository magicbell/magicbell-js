import { INotification } from '@magicbell/react-headless';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import FloatingNotificationInbox from '../src/components/FloatingNotificationInbox';
import MagicBell from '../src/components/MagicBell';

interface IStory {
  handleAllRead: () => void;
  onNotificationClick: (notification: INotification) => void;
}

export default {
  title: 'Examples/Tailwind integration',
  component: MagicBell,
  argTypes: {
    handleAllRead: { action: 'handleAllRead' },
    onNotificationClick: { action: 'onNotificationClick' },
  },
} as Meta;

const Template: Story<IStory> = ({ handleAllRead, onNotificationClick }: IStory) => {
  return (
    <div className="max-w-5xl w-screen">
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div className="flex-1">
          <a className="text-blue-100 hover:text-white hover:border-white" href="/#">
            Home
          </a>
        </div>
        <div>
          <MagicBell
            apiKey="df24a28e8921181f6c4220fc306ba76701592d21"
            userEmail="josue@supportbee.com"
            theme={{
              header: { borderRadius: '2px' },
              footer: { borderRadius: '2px' },
            }}
          >
            {(props) => (
              <FloatingNotificationInbox
                onNotificationClick={onNotificationClick}
                onAllRead={handleAllRead}
                height={450}
                {...props}
              />
            )}
          </MagicBell>
        </div>
      </nav>
      <div className="bg-gray-100 h-96">
        <h1 className="py-20 text-center text-2xl">Welcome to my site</h1>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
