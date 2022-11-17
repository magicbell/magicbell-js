import { WebviewApi } from 'vscode-webview';

export const code: WebviewApi<any> = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
