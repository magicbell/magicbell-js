import * as vscode from 'vscode';

import { BaseView } from './base-view';
import { commandKeys, viewTypes } from './constants';
import * as context from './context';
import { commands } from './lib/commands';
import { createOrShow, register } from './lib/webview';

export function activate(ctx: vscode.ExtensionContext) {
  context.init();

  ctx.subscriptions.push(commands.register(commandKeys.DETAIL_PANE, (data) => createOrShow(DetailView, ctx, { data })));
  ctx.subscriptions.push(register(ListView, ctx));
  ctx.subscriptions.push(register(ListDetailView, ctx));
}

export function deactivate() {
  // intentionally empty
}

class ListView extends BaseView {
  static title = 'Ping';
  static viewType = viewTypes.LIST;
}

class ListDetailView extends BaseView {
  static title = 'Ping Detail';
  static viewType = viewTypes.LIST_DETAIL;
}

class DetailView extends BaseView {
  static title = 'Ping';
  static viewType = viewTypes.DETAIL;
}
