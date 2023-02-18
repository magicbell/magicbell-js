import { Signal } from '@preact/signals-core';
import * as vscode from 'vscode';

import { commands } from './lib/commands';

enum HandleOption {
  hide = 'hide',
  listIfRelated = 'listIfRelated',
  listAlways = 'listAlways',
  popUpIfRelated = 'popUpIfRelated',
  popUpAlways = 'popUpAlways',
}

export class NotificationHandler {
  private notifications: Signal<Array<any>>;
  constructor(notifications: Signal<Array<any>>) {
    this.notifications = notifications;
  }

  private addNotification(notification: any) {
    this.notifications.value = [...this.notifications.value, notification].sort((a, b) => b.sent_at - a.sent_at);
  }

  private async showPopUp(notification: any) {
    const action = await vscode.window.showInformationMessage(notification.title, 'show', 'dismiss');
    if (action !== 'show') {
      return;
    }
    commands.showList();
  }

  public handle(note: any) {
    // TODO adapt field?
    switch (note.category) {
      case HandleOption.hide: {
        break;
      }
      case HandleOption.listIfRelated: {
        // TODO check if repo matches source, add to list.
        break;
      }
      case HandleOption.listAlways: {
        this.addNotification(note);
        break;
      }
      case HandleOption.popUpIfRelated: {
        // TODO check if repo matches source, add to list and show popup.
        break;
      }
      case HandleOption.popUpAlways: {
        this.addNotification(note);
        this.showPopUp(note);
        break;
      }
      default: {
        this.addNotification(note);
        console.warn('Unhandled notification: ', note.title, note.category);
      }
    }
  }
}
