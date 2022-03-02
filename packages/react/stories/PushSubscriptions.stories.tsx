import { MetaComponent, StoryComponent } from '@storybook/react';
import React from 'react';

import { MagicBellProvider } from '../src';
import PushNotificationsSubscriber from '../src/components/PushNotificationsSubscriber';

export default {
  title: 'MagicBell/PushNotificationsSubscriber',
  component: PushNotificationsSubscriber,
} as MetaComponent<typeof MagicBellProvider>;

const Template: StoryComponent<typeof MagicBellProvider> = (props) => (
  <MagicBellProvider {...props}>
    <PushNotificationsSubscriber>
      {({ createSubscription }) => (
        <button onClick={createSubscription}>Subscribe to browser push notifications</button>
      )}
    </PushNotificationsSubscriber>
  </MagicBellProvider>
);

export const Default = Template.bind({});
Default.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
};
