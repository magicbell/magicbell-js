import * as vscode from 'vscode';

import { BaseView } from './base-view';
import { commandKeys, viewTypes } from './constants';
import * as context from './context';
import { commands } from './lib/commands';
import { createOrShow, register } from './lib/webview';

export function activate(ctx: vscode.ExtensionContext) {
  const listView = register(ListView, ctx);

  ctx.subscriptions.push(commands.register(commandKeys.DETAIL_PANE, (data) => createOrShow(DetailView, ctx, { data })));
  ctx.subscriptions.push(
    commands.register(commandKeys.SHOW_LIST, () => {
      commands.showList();
    }),
  );

  ctx.subscriptions.push(listView);
  ctx.subscriptions.push(register(ListDetailView, ctx));

  // Hack to have the badges show up from the point VSCode is launched.
  commands.showList();

  context.init();
}

export function deactivate() {
  // intentionally empty
}

class ListView extends BaseView {
  static title = 'Ping';
  static viewType = viewTypes.LIST;

  unsubNotificationChanges: () => void;

  resolveWebviewView(view: vscode.WebviewView | vscode.WebviewPanel): void {
    super.resolveWebviewView(view);

    // Update the badge whenever notifications change.
    this.unsubNotificationChanges = context.notifications.subscribe((val) => {
      this.setBadge(val.length);
    });
  }

  dispose() {
    this.unsubNotificationChanges();
    super.dispose();
  }
}

class ListDetailView extends BaseView {
  static title = 'Ping Detail';
  static viewType = viewTypes.LIST_DETAIL;
}

class DetailView extends BaseView {
  static title = 'Ping';
  static viewType = viewTypes.DETAIL;
}
