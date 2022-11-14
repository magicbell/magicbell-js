import vscode from 'vscode';

import { bindSignals } from './context';
import { Messenger } from './lib/messenger';
import { WebView } from './lib/webview';

export class BaseView extends WebView {
  static title = 'unnamed';
  static viewType = 'webview';

  messenger: Messenger;

  init(webview: vscode.Webview, disposables: vscode.Disposable[]) {
    this.messenger = new Messenger(webview, disposables);
    bindSignals(this.messenger);
  }
}
