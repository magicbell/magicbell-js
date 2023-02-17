import { effect, Signal } from '@preact/signals-core';
import * as vscode from 'vscode';
import { WebviewApi } from 'vscode-webview';

type Message = { type: string; id?: string; data: any };
type DisposeFn = () => void;

function shortId() {
  return Math.random().toString(36).slice(-8);
}

export class Messenger {
  private readonly frame: WebviewApi<any> | vscode.Webview;
  private readonly disposables: vscode.Disposable[] = [];

  constructor(frame: vscode.Webview | WebviewApi<any>, disposables?: vscode.Disposable[]) {
    this.frame = frame;
    this.disposables = disposables;
  }

  listen(fn: (message: Message) => void): DisposeFn {
    if ('onDidReceiveMessage' in this.frame) {
      // WebviewApi is being used as frame, subscribe to messages from VSCode side.
      const dispose = this.frame.onDidReceiveMessage(fn, null, this.disposables);
      return () => dispose.dispose();
    } else {
      // Window Api is being used, subscribe to messages from react side and
      // wrap handler so signatures are the same.
      const handler = (event: MessageEvent) => {
        if (event.origin !== location.origin) return;
        fn(event.data);
      };

      window.addEventListener('message', handler);
      return () => window.removeEventListener('message', handler);
    }
  }

  on(type: string, fn: (data: any, reply: (data: any) => void) => any): DisposeFn {
    return this.listen(async (message) => {
      if (message.type !== type) return;

      let replied = false;
      const reply = (data: any) => {
        replied = true;

        // the unique type makes this a "private" message, listen still
        // catches it, but it's unlikely to match any msg.type check
        void this.post({ type: `reply-${message.id}`, id: message.id, data });
      };

      const response = await fn(message.data, reply);
      if (!replied && response != null) return reply(response);
    });
  }

  post(message: Message): Promise<Message['data']>;
  post(type: string, data?: Message['data']): Promise<Message['data']>;
  post(messageOrType: Message | string, data?: Message['data']) {
    const id = shortId();

    const message = typeof messageOrType === 'string' ? { type: messageOrType, data } : messageOrType;

    return new Promise((resolve) => {
      const dispose = this.listen((response) => {
        if (response.id !== id) return;
        resolve(response.data);
        dispose();
      });

      this.frame.postMessage({ id, ...message });
    });
  }

  bindSignal(key: string, signal: Signal) {
    effect(() => {
      void this.post(`${key}::set`, signal.value);
    });

    this.on(`${key}::get`, () => {
      void this.post(`${key}::set`, signal.value);
      return signal.value;
    });

    this.on(`${key}::set`, (value) => {
      signal.value = value;
    });
  }
}
