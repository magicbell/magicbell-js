import { effect, signal } from '@preact/signals-core';
import MagicBell from 'magicbell';
import pluralize from 'pluralize';
import * as vscode from 'vscode';

import { contextKeys, signalKeys } from './constants';
import { commands } from './lib/commands';
import { Messenger } from './lib/messenger';

const config = vscode.workspace.getConfiguration('ping');
const magicbell = new MagicBell({
  apiKey: config.get('apiKey'),
  userExternalId: config.get('username'),
  userHmac: config.get('userHmac'),
  appInfo: {
    name: 'ping-vscode',
    version: __PACKAGE_VERSION__,
  },
});

export const activeNotification = signal<string | null>(null);
export const notifications = signal<any | null>(null);

async function pullNotifications() {
  const isFirstPull = !notifications.value;

  const response = await magicbell.notifications.list();
  const count = response.unseen_count;
  notifications.value = response;

  // Reschedule pull.
  setTimeout(pullNotifications, 60000);

  if (!isFirstPull || !count) {
    return;
  }

  const action = await vscode.window.showInformationMessage(
    `You have ${count} ${pluralize('ping', count)} waiting.`,
    'show',
    'dismiss',
  );
  if (action !== 'show') {
    return;
  }
  commands.showList();
}

export function init() {
  pullNotifications();
}

export function bindSignals(messenger: Messenger) {
  messenger.bindSignal(signalKeys.ACTIVE_NOTIFICATION, activeNotification);
  messenger.bindSignal(signalKeys.NOTIFICATIONS, notifications);

  messenger.on('toast', async (data) => {
    return vscode.window.showInformationMessage(data.message, ...data.action);
  });

  messenger.on('archive', async (notificationId) => {
    notifications.value = {
      ...notifications.value,
      notifications: notifications.value.notifications.filter((x) => x.id !== notificationId),
    };

    await magicbell.notifications.archive(notificationId);
    magicbell.notifications.list().then(async (response) => {
      notifications.value = response;
    });
  });

  messenger.on('open-url', async (url) => {
    vscode.env.openExternal(vscode.Uri.parse(url));
  });
}

effect(() => {
  if (!activeNotification.value) return;
  commands.showDetailPane();
  commands.setContext(contextKeys.ACTIVE_NOTIFICATION, activeNotification.value);
});
