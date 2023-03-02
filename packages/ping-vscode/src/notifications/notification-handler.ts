import { Signal } from '@preact/signals-core';
import pluralize from 'pluralize';
import * as vscode from 'vscode';

import { commands } from '../lib/commands';

// eslint-disable-next-line
// @ts-ignore
enum _HandleOption {
  hide = 'hide',
  listIfRelated = 'listIfRelated',
  listAlways = 'listAlways',
  popUpIfRelated = 'popUpIfRelated',
  popUpAlways = 'popUpAlways',
}

export type HandleNotificationFun = (note: any) => void;

export class NotificationHandler {
  private notifications: Signal<Array<any>>;
  constructor(notifications: Signal<Array<any>>) {
    this.notifications = notifications;
  }

  private addNotification(notification: any) {
    this.notifications.value = [...this.notifications.value, notification].sort((a, b) => b.sent_at - a.sent_at);
  }

  // eslint-disable-next-line
  // @ts-ignore
  private async showPopUp(notification: any) {
    const action = await vscode.window.showInformationMessage(notification.title, 'show', 'dismiss');
    if (action !== 'show') {
      return;
    }
    commands.showList();
  }

  public handle(note: any) {
    // TODO Once backend adds priority mappings, we can use note.category (or whatever
    // field is used as priority) to switch-case on the priority and render notifications
    // accordingly as pop up, list element, or hidden. Otions for handling can be declared
    // in _HandleOption.

    this.addNotification(note);
  }

  public async onFirstPull(unreadNotifications: number) {
    const action = await vscode.window.showInformationMessage(
      `You have ${unreadNotifications} ${pluralize('ping', unreadNotifications)} waiting.`,
      'show',
      'dismiss',
    );
    if (action !== 'show') {
      return;
    }
    commands.showList();
  }
}
