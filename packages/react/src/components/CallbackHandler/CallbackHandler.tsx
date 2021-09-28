import React from 'react';
import { useMagicBellEvent } from '@magicbell/react-headless';
import IRemoteNotification from '@magicbell/react-headless/dist/types/IRemoteNotification';

export interface Props {
  onNewNotification?: (notification: IRemoteNotification) => void;
}

/**
 * Headless component to setup handlers for realtime events.
 *
 * @example
 * <CallbackHandler onNewNotification={showAlert} />
 */
export default function CallbackHandler({ onNewNotification }: Props) {
  const handleNewNotification = (notification: IRemoteNotification) => {
    if (onNewNotification) onNewNotification(notification);
  };

  useMagicBellEvent('notifications.new', handleNewNotification);

  return null;
}
