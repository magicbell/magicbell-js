import { Meta } from '@storybook/react';
import React from 'react';

import { MagicBellProvider } from '../../src';
import PushNotificationsSubscriber from '../../src/components/PushNotificationsSubscriber';

const Component = (props) => (
  <MagicBellProvider {...props}>
    <PushNotificationsSubscriber>
      {({ createSubscription }) => (
        <button onClick={createSubscription}>Subscribe to browser push notifications</button>
      )}
    </PushNotificationsSubscriber>
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
};

export default meta;

export const Default = {};
