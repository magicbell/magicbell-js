import fs from 'fs';
import { dirname } from 'path';
import * as vscode from 'vscode';

export type WebViewContext = {
  webview: vscode.Webview;
  extensionUri: vscode.Uri;
  extensionMode: vscode.ExtensionMode;
  entryFile: string;
  title: string;
  viewType: string;
  data?: any;
};

function getWebviewUri(context: WebViewContext) {
  const uri = vscode.Uri.joinPath(context.extensionUri, context.entryFile);
  return context.webview.asWebviewUri(uri).toString();
}

function getFsPath(context: WebViewContext) {
  return vscode.Uri.joinPath(context.extensionUri, context.entryFile).fsPath;
}

function render(context: WebViewContext) {
  const path = getFsPath(context);

  context.webview.html = getHTML(context);

  // watch for changes and reload the webview during development
  if (context.extensionMode === vscode.ExtensionMode.Development) {
    fs.watch(dirname(path), (event, file) => {
      if (file === 'extension.js') {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
      } else {
        context.webview.html = getHTML(context);
      }
    });
  }
}

function getHTML(context: WebViewContext): string {
  const nonce = getNonce();
  const path = getWebviewUri(context);

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>${context.title}</title>
  
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: vscode-webview: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
      </head>
  
      <body data-view-type="${context.viewType}">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>

        <script nonce="${nonce}">
            window.__INITIAL_DATA__ = ${JSON.stringify(context.data || {})};
        </script>
        <script nonce="${nonce}" src="${path}"></script>
      </body>
    </html>`;
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const WebViewSymbol = Symbol.for('webview');

// don't merge args & options, vscode.ExtensionContext can't be desctructed, so having
// them as separate parameters is better
type BuilderArgs = Pick<WebViewContext, 'extensionUri' | 'extensionMode'>;
type BuilderOptions = { entryFile?: string; data?: any; title?: string };

function cleanArgs(View: typeof WebView, args: BuilderArgs, options: BuilderOptions = {}) {
  if (!View.viewType) {
    throw new Error('You must define a viewType as static prop on your WebView');
  }

  // don't destruct args, it will throw: `CANNOT use API proposal: extensionRuntime.`
  return {
    data: options.data || {},
    entryFile: options.entryFile || 'dist/index.js',
    extensionUri: args.extensionUri,
    extensionMode: args.extensionMode,
    title: View.title,
    viewType: View.viewType,
  };
}

export function register(View: typeof WebView, args: BuilderArgs, options?: BuilderOptions): WebView {
  const view = new View(cleanArgs(View, args, options));
  vscode.window.registerWebviewViewProvider(View.viewType, view);
  return view;
}

export function createOrShow(View: typeof WebView, args: BuilderArgs, options?: BuilderOptions): WebView {
  const column = vscode.window.activeTextEditor?.viewColumn || vscode.ViewColumn.One;

  if (View.currentPanel?.panel && 'reveal' in View.currentPanel.panel) {
    View.currentPanel.panel.reveal(column);
    if (options.title) {
      View.currentPanel.panel.title = options.title;
    }

    if (options.data) {
      View.currentPanel.rerender(options.data);
    }
  } else {
    View.currentPanel = new View(cleanArgs(View, args, options), column, WebViewSymbol);
  }

  return View.currentPanel;
}

export class WebView implements vscode.WebviewViewProvider {
  public static currentPanel: WebView | undefined;

  static title = 'unnamed';
  static viewType = 'webview';

  readonly panel: vscode.WebviewPanel | vscode.WebviewView;
  readonly context: Omit<WebViewContext, 'webview'>;

  private webview: vscode.Webview;
  private disposables: vscode.Disposable[] = [];

  constructor(args: Omit<WebViewContext, 'webview'>, column?: vscode.ViewColumn, symbol?: symbol) {
    this.context = args;

    // if column is a number, this panel was initialized via createOrShow, which means we need
    // to construct a panel. Otherwise, we're dealing with a sidebar and vscode will call
    // resolveWebviewView for us. Which means we're done.
    if (typeof column !== 'number') return;

    if (symbol !== WebViewSymbol) throw new Error('Cannot create panel directly, use createOrShow');

    this.panel = vscode.window.createWebviewPanel(args.viewType, args.title, column, {
      enableScripts: true,
      localResourceRoots: [args.extensionUri],
    });

    this.resolveWebviewView(this.panel);
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(webview: vscode.Webview, disposables: vscode.Disposable[]) {
    // intentionally left blank, up for the inherited to implement
  }

  resolveWebviewView(view: vscode.WebviewView | vscode.WebviewPanel): void {
    this.webview = view.webview;

    this.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    // call before render, as rendering might request data from messenger
    this.init(this.webview, this.disposables);
    render({ ...this.context, webview: this.webview });
  }

  public rerender(data: any) {
    render({ ...this.context, webview: this.webview, data: data || this.context.data });
  }

  public dispose() {
    const constructor = this.constructor as typeof WebView;
    if ('currentPanel' in constructor) constructor.currentPanel = undefined;

    if (this.panel && 'dispose' in this.panel) {
      this.panel.dispose();
    }

    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x && 'dispose' in x) {
        x.dispose();
      }
    }
  }

  public setBadge(value: number, tooltip?: string) {
    if (this.panel && 'badge' in this.panel) {
      this.panel.badge = { value, tooltip };
    }
  }
}
